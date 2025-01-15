import { useMemo } from "react";
import { isSameDialect, isSameLanguage, renderContentToString, requiresTranslation } from "generaltranslation";
import { useCallback, useEffect, useState } from "react";
import useBrowserLocale from "../hooks/useBrowserLocale";

import { GTContext } from "./GTContext";
import { Content, Dictionary, RenderMethod, TranslationsObject } from "../types/types";
import getDictionaryEntry from "./helpers/getDictionaryEntry";
import { addGTIdentifier, writeChildrenAsObjects } from "../internal";
import extractEntryMetadata from "./helpers/extractEntryMetadata";
import renderDefaultChildren from "./rendering/renderDefaultChildren";
import renderTranslatedChildren from "./rendering/renderTranslatedChildren";

import { defaultCacheUrl, defaultRuntimeApiUrl, libraryDefaultLocale } from "generaltranslation/internal";
import renderVariable from "./rendering/renderVariable";
import { createLibraryNoEntryWarning, projectIdMissingError } from "../errors/createErrors";
import { listSupportedLocales } from "@generaltranslation/supported-locales";
import useDynamicTranslation from "./dynamic/useDynamicTranslation";
import { defaultRenderSettings } from "./rendering/defaultRenderSettings";
import { hashJsxChildren } from 'generaltranslation/id'
import React from "react";
import renderSkeleton from "./rendering/renderSkeleton";

/**
 * Provides General Translation context to its children, which can then access `useGT`, `useLocale`, and `useDefaultLocale`.
 *
 * @param {React.ReactNode} children - The children components that will use the translation context.
 * @param {string} [projectId] - The project ID required for General Translation cloud services.
 * @param {Dictionary} [dictionary=defaultDictionary] - The translation dictionary for the project.
 * @param {string[]} [locales] - The list of approved locales for the project.
 * @param {string} [defaultLocale=libraryDefaultLocale] - The default locale to use if no other locale is found.
 * @param {string} [locale] - The current locale, if already set.
 * @param {string} [cacheUrl='https://cache.gtx.dev'] - The URL of the cache service for fetching translations.
 * 
 * @returns {JSX.Element} The provider component for General Translation context.
 */
export default function GTProvider({
    children, 
    projectId,
    dictionary = {}, 
    locales = listSupportedLocales(), 
    defaultLocale = libraryDefaultLocale, 
    locale = useBrowserLocale(defaultLocale, locales) || defaultLocale, 
    cacheUrl = defaultCacheUrl,
    runtimeUrl = defaultRuntimeApiUrl,
    renderSettings = defaultRenderSettings,
    devApiKey,
    ...metadata
}: {
    children?: any;
    projectId?: string;
    dictionary?: Dictionary;
    locales?: string[];
    defaultLocale?: string;
    locale?: string;
    cacheUrl?: string;
    runtimeUrl?: string;
    devApiKey?: string;
    renderSettings?: {
        method: RenderMethod;
        timeout?: number | null;
    };
    [key: string]: any
}): React.JSX.Element {


    if (!projectId && (cacheUrl === defaultCacheUrl || runtimeUrl === defaultRuntimeApiUrl)) {
        throw new Error(projectIdMissingError)
    };

    const regionalTranslationRequired = useMemo(() => {
            return isSameLanguage(defaultLocale, locale) && !isSameDialect(defaultLocale, locale)
        }, [defaultLocale, locale]);
    const translationRequired = useMemo(() => {
        return requiresTranslation(defaultLocale, locale, locales) || regionalTranslationRequired
    }, [defaultLocale, locale, locales, regionalTranslationRequired]);
    

    const [translations, setTranslations] = useState<TranslationsObject | null>(
        cacheUrl ? null : {}
    );
    
    useEffect(() => {
        if (!translations) {
            if (!translationRequired) {
                setTranslations({}); // no translation required
            } else {
                (async () => { // check cache for translations
                    try {
                        const response = await fetch(`${cacheUrl}/${projectId}/${locale}`);
                        const result = await response.json();
                        setTranslations(result);
                    } catch (error) {
                        setTranslations({});
                    }
                })();
            }
        }
    }, [translationRequired, cacheUrl, projectId, locale])

    const translate = useCallback((
        id: string, 
        options: Record<string, any> = {}
    ) => {
        
        // get the dictionary entry
        const dictionaryEntry = getDictionaryEntry(dictionary, id);
        if (
            dictionaryEntry === undefined || dictionaryEntry === null || 
            (typeof dictionaryEntry === 'object' && !Array.isArray(dictionaryEntry))) 
        {
            console.warn(createLibraryNoEntryWarning(id))
            return undefined;
        };
        
        let { entry, metadata } = extractEntryMetadata(dictionaryEntry);
        
        // Get variables and variable options
        let variables = options; 
        let variablesOptions = metadata?.variablesOptions;

        const taggedEntry = addGTIdentifier(entry, id);

        // render default locale
        function renderDefault() {
            if (typeof taggedEntry === 'string') {
                return renderContentToString(
                    taggedEntry,
                    defaultLocale, 
                    variables,
                    variablesOptions
                )
            }
            return renderDefaultChildren({
                children: taggedEntry,
                variables,
                variablesOptions,
                defaultLocale,
                renderVariable
            })
        }

        // render skeleton
        function renderLoadingSkeleton() {
            if (typeof taggedEntry === 'string') {
                return '';
            }
            return renderSkeleton({ // render skeleton for jsx
                children: taggedEntry,
                variables,
                defaultLocale,
                renderVariable
            });
        }

        // If no translations are required
        if (!translationRequired) {
            return renderDefault();
        }
        
        // If a translation is required
        if (translations) {
            const context = metadata?.context;
            const childrenAsObjects = writeChildrenAsObjects(taggedEntry);
            // get hash
            const hash: string = hashJsxChildren(context ? [childrenAsObjects, context] : childrenAsObjects);
            
            // loading behavior
            if (!translations[id][hash]) {
                if (renderSettings.method === 'skeleton') {
                    return renderLoadingSkeleton();
                } else if (renderSettings.method === 'replace' ) {
                    return renderDefault();
                } else if (renderSettings.method === 'default') {
                    if (regionalTranslationRequired) {
                        return renderDefault();
                    } else {
                        return renderLoadingSkeleton();
                    }
                }
                if (renderSettings.method === 'hang') {
                  // TODO: Remove this error
                  throw new Error("gt-react GTProvider Provider JSX/STRING hang should not be invoked while waiting for translation");
                }
                if (renderSettings.method === 'subtle') {
                  // TODO: Remove this error
                  throw new Error("gt-react GTProvider Provider JSX/STRING subtle should not be invoked while waiting for translation");
                }
                // TODO: Remove this error
                throw new Error("gt-react GTProvider Provider JSX/STRING should not be invoked while waiting for translation");
            }

            // error behavior -> fallback to default language
            if (translations?.[id]?.error) {
                return renderDefault();
            }

            // render translated content
            const target = translations[id][hash];
            if (typeof taggedEntry === 'string') {
                return renderContentToString(
                    target as Content, [locale, defaultLocale],
                    variables, variablesOptions
                )
            }
            return renderTranslatedChildren({
                source: taggedEntry,
                target,
                variables, variablesOptions,
                locales: [locale, defaultLocale],
                renderVariable
            });
        }
    }, [dictionary, translations, translationRequired, defaultLocale]);

    const { translateChildren, translateContent, translationEnabled } = useDynamicTranslation({
        targetLocale: locale, projectId, defaultLocale, devApiKey, runtimeUrl, setTranslations, ...metadata
    });

    return (
        <GTContext.Provider value={{
            translate, translateContent, translateChildren,
            locale, defaultLocale, 
            translations, translationRequired, regionalTranslationRequired,
            projectId, translationEnabled,
            renderSettings
        }}>
            {children}
        </GTContext.Provider>
    )

}