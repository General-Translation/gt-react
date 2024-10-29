import React, { useLayoutEffect } from "react";
import { determineLanguage, renderContentToString, requiresTranslation } from "generaltranslation";
import { ReactElement, useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";

import { GTContext } from "./GTContext";
import { Dictionary, DictionaryEntry, Translation } from "../primitives/types";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier } from "../internal";
import extractEntryMetadata from "./helpers/extractEntryMetadata";
import renderDefaultChildren from "./rendering/renderDefaultChildren";
import renderTranslatedChildren from "./rendering/renderTranslatedChildren";

import primitives from "../primitives/primitives";
const { defaultDictionary, defaultDictionaryName, libraryDefaultLocale, localeCookieName } = primitives;

/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectID] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string} [dictionaryName=defaultDictionaryName] - The name of the translation dictionary.
 * @param {string[]} [locales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheURL='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 * 
 * @returns {JSX.Element} The provider component for General Translation context.
 */
export default function GTProvider({
    children, 
    projectID,
    dictionary = defaultDictionary, 
    dictionaryName = defaultDictionaryName,
    locales, 
    defaultLocale = locales?.[0] || libraryDefaultLocale, 
    locale, 
    cacheURL = 'https://cache.gtx.dev'
}: {
    children?: any;
    projectID?: string;
    dictionary?: Dictionary;
    dictionaryName?: string;
    locales?: string[];
    defaultLocale?: string;
    locale?: string;
    cacheURL?: string;
}): JSX.Element {

    if (!projectID && cacheURL === 'https://cache.gtx.dev') {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.")
    }

    const browserLocale = useBrowserLocale(defaultLocale, localeCookieName, locales);
    locale = locale || browserLocale;
    if (locales) {
        locale = determineLanguage([locale, browserLocale], locales) || locale;
    }

    const translationRequired = requiresTranslation(defaultLocale, locale, locales);

    const [translations, setTranslations] = useState<Record<string, Translation> | null>(
        cacheURL ? null : {}
    )

    useEffect(() => {
        if (!translations) {
            if (!translationRequired) {
                setTranslations({}); // no translation required
            } else {
                (async () => {
                    const response = await fetch(`${cacheURL}/${projectID}/${locale}/${dictionaryName}`);
                    const result = await response.json();
                    setTranslations(result);
                })()
            }
        }
    }, [translations, translationRequired])

    const translate = useCallback((
        id: string, 
        options: Record<string, any> = {}, 
        f?: Function
    ) => {
        
        // get the dictionary entry
        let { entry, metadata } = extractEntryMetadata(
            getDictionaryEntry(dictionary, id) as DictionaryEntry
        );

        if (entry === undefined || entry === null) {
            console.warn(`Dictionary entry with id "${id}" is null or undefined`)
            return;
        };
        
        // Get variables and variable options
        let variables; let variablesOptions;
        if (options) {
            variables = options;
            if (metadata?.variablesOptions) {
                variablesOptions = metadata.variablesOptions;
            }
        }

        // Handle if the entry is a function
        if (typeof f === 'function') {
            entry = f(options) as ReactElement;
        } else if (typeof entry === 'function') {
            entry = entry(options) as ReactElement;
        }

        const taggedEntry = addGTIdentifier(entry, id);

        // If no translations are required
        if (!translationRequired) {
            if (typeof taggedEntry === 'string') {
                return renderContentToString(
                    taggedEntry, defaultLocale, 
                    variables, variablesOptions
                )
            }
            return renderDefaultChildren({
                children: taggedEntry, variables, variablesOptions, defaultLocale
            })
        }

        // If a translation is required
        if (translations) {
            const translation = translations[id];
            if (typeof taggedEntry === 'string') {
                return renderContentToString(
                    translation.t as any, [locale, defaultLocale],
                    variables, variablesOptions
                )
            }
            return renderTranslatedChildren({
                source: taggedEntry,
                target: translation.t,
                variables, variablesOptions,
                locales: [locale, defaultLocale]
            });
        }
    }, [dictionary, translations, translationRequired, defaultLocale]);

    return (
        <GTContext.Provider value={{
            translate, locale, defaultLocale, translations
        }}>
            {children}
        </GTContext.Provider>
    )

}