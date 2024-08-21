// intended for purely client-side apps, put at the root of the project

'use client'

import { useEffect, useCallback, useState } from "react";
import { GTContext } from "../ClientProvider"
import { isSameLanguage } from "generaltranslation";
import defaultGTProps from "../../types/defaultGTProps";
import useBrowserLocale from "../hooks/useBrowserLocale";
import renderDictionary from "./helpers/renderDictionary";
import flattenDictionary from "../../primitives/flattenDictionary";
import getDictionaryReference from "../../primitives/getDictionaryReference";

export default function GTClientProvider({
    children, 
    projectID,
    dictionary = defaultGTProps.dictionary, 
    dictionaryName = defaultGTProps.dictionaryName,
    approvedLocales, defaultLocale = approvedLocales?.[0] ?? defaultGTProps.defaultLocale, 
    locale = '', 
    remoteSource = defaultGTProps.remoteSource,
    cacheURL = defaultGTProps.cacheURL,
    translations
}: {
    children?: any;
    projectID?: string;
    dictionary?: Record<string, any>;
    dictionaryName?: string;
    approvedLocales?: string[];
    defaultLocale?: string;
    locale?: string;
    remoteSource?: boolean;
    cacheURL?: string;
    translations?: Record<string, () => Promise<Record<string, any>>>;
}) {

    console.log(children)

    const browserLocale = useBrowserLocale(defaultLocale);
    locale = locale || browserLocale;

    const [translatedDictionary, setTranslatedDictionary] = useState(flattenDictionary(dictionary));

    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.")
    }

    const [translationComplete, setTranslationComplete] = useState(isSameLanguage(locale, defaultLocale));
    useEffect(() => {
        setTranslationComplete(isSameLanguage(locale, defaultLocale));
    }, [locale, defaultLocale])

    useEffect(() => {
        if (!translationComplete && locale && !isSameLanguage(locale, defaultLocale)) {
            async function completeDictionary() {
                let completedDictionary = dictionary;
                if (translations && translations[locale]) {
                    try {
                        const loadDictionary = translations[locale];
                        const loadedDictionary = await loadDictionary();
                        if (Object.keys(loadedDictionary).length) {
                            completedDictionary = { ...completedDictionary, ...loadedDictionary }
                        } else {
                            throw new Error(``)
                        }
                    } catch (error) {
                        console.error(`Error loading dictionary for locale ${locale}:`, error);
                    }
                }
                if (remoteSource) {
                    try {
                        const response = await fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                        const result = await response.json();
                        if (Object.keys(result).length) {
                            const renderedDictionary = renderDictionary({
                                result, dictionary, locales: [locale, defaultLocale]
                            });
                            completedDictionary = { ...completedDictionary, ...renderedDictionary }
                        } else {
                            throw new Error(`No dictionary found in remote cache.`)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                setTranslatedDictionary(flattenDictionary(completedDictionary))
                setTranslationComplete(true);
            }
            completeDictionary();
        }
    }, [cacheURL, remoteSource, locale, translations])

    const translate = useCallback((id: string) => {
        return translatedDictionary[id];
    }, [translatedDictionary]);

    return (
        <GTContext.Provider value={{
            translate, locale, defaultLocale
        }}>
            {
                translationComplete
                ? children : undefined
            }
        </GTContext.Provider>
    )
    

}