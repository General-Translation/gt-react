import React, { useMemo } from "react";
import { determineLocale, renderContentToString, requiresTranslation } from "generaltranslation";
import { ReactElement, useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";

import { GTContext } from "./GTContext";
import { Dictionary, DictionaryEntry, Translation } from "../types/types";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier } from "../internal";
import extractEntryMetadata from "./helpers/extractEntryMetadata";
import renderDefaultChildren from "./rendering/renderDefaultChildren";
import renderTranslatedChildren from "./rendering/renderTranslatedChildren";

import { defaultCacheURL, libraryDefaultLocale } from "generaltranslation/internal";
import renderVariable from "./rendering/renderVariable";
import { createLibraryNoEntryWarning, projectIdMissingError } from "../errors/createErrors";
import { listSupportedLocales } from "@generaltranslation/supported-locales";

/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectId] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string[]} [locales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheURL='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 * 
 * @returns {JSX.Element} The provider component for General Translation context.
 */
export default function GTProvider({
    children, 
    projectId,
    dictionary = {}, 
    locales, 
    defaultLocale = libraryDefaultLocale, 
    locale, 
    cacheURL = defaultCacheURL
}: {
    children?: any;
    projectId?: string;
    dictionary?: Dictionary;
    locales?: string[];
    defaultLocale?: string;
    locale?: string;
    cacheURL?: string;
}): JSX.Element {

    if (!projectId && cacheURL === defaultCacheURL) {
        throw new Error(projectIdMissingError)
    }

    const supportedLocales = useMemo(() => {
        return listSupportedLocales();
    }, []);
    if (!locales) {
        locales = supportedLocales;
    }

    const browserLocale = useBrowserLocale(defaultLocale, locales);
    locale = locale || browserLocale;
    locale = determineLocale([locale, browserLocale], locales) || locale;

    const translationRequired = useMemo(() => requiresTranslation(defaultLocale, locale, locales), [defaultLocale, locale, locales])

    const [translations, setTranslations] = useState<Record<string, Translation> | null>(
        cacheURL ? null : {}
    )

    useEffect(() => {
        if (!translations) {
            if (!translationRequired) {
                setTranslations({}); // no translation required
            } else {
                (async () => {
                    const response = await fetch(`${cacheURL}/${projectId}/${locale}`);
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
            console.warn(createLibraryNoEntryWarning(id))
            return undefined;
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
                children: taggedEntry, variables, variablesOptions, defaultLocale,
                renderVariable
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
                locales: [locale, defaultLocale],
                renderVariable
            });
        }
    }, [dictionary, translations, translationRequired, defaultLocale]);

    return (
        <GTContext.Provider value={{
            translate, 
            locale, defaultLocale, 
            translations, translationRequired,
            projectId
        }}>
            {children}
        </GTContext.Provider>
    )

}