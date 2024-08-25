// On the server
import 'server-only'

import React, { isValidElement } from 'react';

import ClientProvider from '../../client/ClientProvider';
import I18NConfiguration from '../../config/I18NConfiguration';
import flattenDictionary from '../../index/flattenDictionary';
import getEntryMetadata from '../../primitives/rendering/getEntryMetadata';
import addGTIdentifier from '../../index/addGTIdentifier';
import writeChildrenAsObjects from '../../index/writeChildrenAsObjects';
import calculateHash from '../../index/calculateHash';
import getEntryTranslationType from '../../primitives/rendering/getEntryTranslationType';
import Plural from '../plural/InnerPlural';
import cloneDictionary from '../../dictionary/cloneDictionary';

/*
e.g.
dictionary = {
    "greeting": "Hello, world",
    "greeting.component": <div>Hello, world</div>,
    "greeting.text.withparams": intl("Hello, world", { context: "Be informal." })
}
*/

export default async function GTProvider({
    I18NConfig,
    locale, defaultLocale,
    children,
    id='',
    dictionary = id ? {} : I18NConfig.getDictionary(),
    ...props
}: {
    I18NConfig: I18NConfiguration;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
}): Promise<any> {

    let providerID: string = id;
    if (providerID) {
        const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(providerID));
        if (entry && !isValidElement(entry) && typeof entry === 'object') {
            dictionary = { ...entry, ...flattenDictionary(dictionary) }
        }
    }
    dictionary = flattenDictionary(dictionary, providerID);
    
    let translations: Record<string, any> = {};

    const renderSettings = I18NConfig.getRenderSettings();

    const clonedDictionary = cloneDictionary(dictionary);

    for (const id of Object.keys(clonedDictionary)) {
        let { entry, metadata } = getEntryMetadata(clonedDictionary[id]);
        metadata = (props || metadata) ? { ...props, ...(metadata || {}) } : undefined;
        const translationType = getEntryTranslationType(clonedDictionary[id]);
        if (translationType === "t") {
            entry = <>{entry}</>;
        } else if (translationType === "plural") {
            const { 
                ranges, zero, one, two, few, many, other, singular, dual, plural,
                ...tOptions 
            } = metadata || {};
            metadata = tOptions;
            const innerProps = {
                ranges, zero, one, two, few, many, other, singular, dual, plural
            };
            entry = (
                <Plural 
                    locales={[locale, defaultLocale]}
                    n={1}
                    {...innerProps}
                >
                    {entry}
                </Plural>
            );
        }
        const taggedEntry = addGTIdentifier(entry);
        // change the dictionary here
        // elsewhere we are changing the cloned dictionary
        // we are just adding the gt identifier, nothing more
        if (translationType === "t" || translationType === "plural") {
            dictionary[id] = taggedEntry;
        };
        clonedDictionary[id] = [taggedEntry, metadata];
    }

    const translationRequired: boolean = I18NConfig.translationRequired(locale);
    
    if (translationRequired) {
        const { local, remote } = await I18NConfig.getTranslations(locale, props.dictionaryName);
        await Promise.all(Object.keys(clonedDictionary).map(async id => {
            // COMPLICATED INNER TRANSLATION FUNCTION
            // EQUIVALENT TO <T> OR intl() BEFORE RENDERING
            // i.e. passes the translation dictionary

            let { entry, metadata } = getEntryMetadata(clonedDictionary[id]);

            const translationType = getEntryTranslationType(clonedDictionary[id]);
            
            const entryAsObjects = writeChildrenAsObjects(entry);
            const key: string = metadata?.context ? await calculateHash([entryAsObjects, metadata.context]) : await calculateHash(entryAsObjects);

            const translation = await I18NConfig.getTranslation(locale, key, id, props.dictionaryName ?? undefined, { remote, local }) 

            if (translation) {
                return translations[id] = translation;
            }

            // NEW TRANSLATION REQUIRED

            if (!I18NConfig.automaticTranslationEnabled()) return;
            
            // INTL
            if (translationType === "intl") {
                const translationPromise = I18NConfig.intl({ content: entry, targetLanguage: locale, options: { ...metadata, hash: key, id } });
                if (renderSettings.method !== "subtle") {
                    return translations[id] = await translationPromise;
                }
                return translations[id] = entry;
            } 
            else /*if (translationType === "t" || translationType === "plural")*/ { // i.e., it's JSX
                const targetPromise = I18NConfig.translateChildren({ children: entryAsObjects, targetLanguage: locale, metadata: { ...metadata, hash: key, id } });
                const renderMethod = renderSettings.method;
                if (renderSettings.method === "hang") {
                    return translations[id] = await targetPromise;
                }
                // called fallback"Target" because it should actually be the cached target object, not a completed translation
                // setting target to a valid React element, as done here with props.fallback and children, works because of how renderChildren will render target when it is a valid element and there's no match
                let loadingFallbackTarget = props.fallback;
                let errorFallbackTarget = children; //
                if (renderMethod === "skeleton") {
                    if (!loadingFallbackTarget) loadingFallbackTarget = <></>;
                } else if (renderMethod === "replace") {
                    if (!loadingFallbackTarget) loadingFallbackTarget = children; 
                }
                if (renderSettings.renderPrevious && remote && remote[id] && remote[id].k) {
                    loadingFallbackTarget = remote[id].t;
                    errorFallbackTarget = loadingFallbackTarget;
                }
                if (!["skeleton", "replace"].includes(renderMethod)) {
                    return translations[id] = errorFallbackTarget;
                }
                return translations[id] = [targetPromise, {
                    loadingFallbackTarget, errorFallbackTarget
                }];
            }
        }));
    }

    return (
        <ClientProvider
            locale={locale}
            defaultLocale={defaultLocale}
            dictionary={dictionary}
            translations={translations}
            translationRequired={translationRequired}
            renderSettings={renderSettings}
        >
            {children}
        </ClientProvider>
    );

}

