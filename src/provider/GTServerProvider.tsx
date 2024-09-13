// 
import React from "react";
import { addGTIdentifier, flattenDictionary, calculateHash, writeChildrenAsObjects, extractEntryMetadata, primitives } from "gt-react/internal";
import { ReactNode } from "react";
import getI18NConfig from "../utils/getI18NConfig";
import _ClientProvider from "./_ClientProvider";
import getLocale from '../request/getLocale';
import getMetadata from '../request/getMetadata';
import { splitStringToContent } from "generaltranslation";
import getDictionary, { getDictionaryEntry } from "../dictionary/getDictionary";

export default async function GTProvider({
    children, id
}: {
    children?: ReactNode,
    id?: string
}) {

    const I18NConfig = getI18NConfig();

    const rawDictionary = flattenDictionary(
        id ?
        getDictionaryEntry(id) :
        getDictionary()
    );

    const getID = (suffix: string) => {
        return id ? `${id}.${suffix}` : suffix;
    }

    const locale = getLocale();
    const additionalMetadata = getMetadata();
    const defaultLocale = I18NConfig.getDefaultLocale();
    const renderSettings = I18NConfig.getRenderSettings();

    let dictionary: Record<string, any> = {};
    let translations: Record<string, any> = {};

    const existingTranslations = await I18NConfig.getTranslations(locale);
    const translationRequired = I18NConfig.translationRequired(locale)

    await Promise.all(Object.entries(rawDictionary).map(async ([id, dictionaryEntry]) => {

        id = getID(id);

        let { entry, metadata } = extractEntryMetadata(dictionaryEntry);

        if (typeof entry === 'function') {
            entry = entry({});
            metadata = { ...metadata, isFunction: true };
        }

        const taggedEntry = addGTIdentifier(entry, metadata, id);

        dictionary[id] = [taggedEntry, metadata];
        
        if (!translationRequired || !entry) return;

        const entryAsObjects = writeChildrenAsObjects(taggedEntry);

        const key: string = metadata?.context ? await calculateHash([entryAsObjects, metadata.context]) : await calculateHash(entryAsObjects);

        const translation = existingTranslations?.[id];

        if (translation) {
            return translations[id] = translation;
        }

        if (!I18NConfig.translationEnabled()) return;

        if (typeof taggedEntry === 'string') {
            const translationPromise = I18NConfig.translate({ content: splitStringToContent(taggedEntry), targetLanguage: locale, options: { id, hash: key, ...additionalMetadata } });
            return renderSettings.method !== "subtle" 
                ? translations[id] === await translationPromise :
                undefined
            ;
        }

        const translationPromise = I18NConfig.translateChildren({ 
            children: entryAsObjects, 
            targetLanguage: locale, 
            metadata: { id, hash: key, ...additionalMetadata, ...(renderSettings.timeout && { timeout: renderSettings.timeout }) } 
        });

        let loadingFallback;
        let errorFallback;

        if (renderSettings.method === "skeleton") {
            loadingFallback = <React.Fragment key={`skeleton_${id}`}></React.Fragment>
        }

        return translations[id] = { 
            promise: translationPromise,
            loadingFallback, errorFallback
        }

    }));

    return (
        <_ClientProvider
            dictionary={dictionary}
            translations={translations}
            locale={locale}
            defaultLocale={defaultLocale}
            translationRequired={translationRequired}
        >
            {children}
        </_ClientProvider>
    )

}