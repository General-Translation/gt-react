// intended for purely client-side apps, put at the root of the project

'use client'

const getDictionaryReference = (locale: string, dictionaryName: string): string => {
    return `${encodeURIComponent(dictionaryName)}/${encodeURIComponent(locale)}`;
}

import { useEffect, useCallback, useState } from "react";
import { GTContext } from "../ClientProvider"
import getBrowserLocale from "./getBrowserLocale"
import { isSameLanguage } from "generaltranslation";
import defaultGTProps from "../../types/defaultGTProps";

export default function GTClientProvider({
    children, 
    projectID,
    dictionary = defaultGTProps.dictionary, dictionaryName = defaultGTProps.dictionaryName,
    approvedLocales, defaultLocale = approvedLocales?.[0] ?? defaultGTProps.defaultLocale, 
    locale = getBrowserLocale(defaultLocale), 
    remoteSource = defaultGTProps.remoteSource,
    cacheURL = defaultGTProps.cacheURL
}: any) {

    const [translations, setTranslations] = useState(dictionary);

    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.")
    }

    const [retrieved, setRetrieved] = useState(isSameLanguage(locale, defaultLocale));

    useEffect(() => {
        if (!retrieved) {
            const fetchCachedTranslations = async () => {
                try {
                    const response = await fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                    const result = await response.json();
                    if (Object.keys(result).length) {
                        // reconcile result with existing dictionary
                        const renderedTranslations = result;
                        setTranslations(renderedTranslations)
                    }
                } catch (error) {
                    console.error('Remote dictionary error:', error);
                }
                setRetrieved(true);
            };
            fetchCachedTranslations();
        }
    }, [cacheURL, remoteSource, locale])

    const translate = useCallback((id: string) => {
        return translations[id];
    }, [translations]);

    return (
        <GTContext.Provider value={{
            translate, locale, defaultLocale
        }}>
            {
                retrieved
                ? children : undefined
            }
        </GTContext.Provider>
    )
    

}