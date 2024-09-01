// intended for purely client-side apps, put at the root of the project

'use client'

import React, { useEffect, useCallback, useState, useMemo } from "react";
import { GTContext } from "../ClientProvider"
import defaultGTProps from "../../types/defaultGTProps";
import useBrowserLocale from "../hooks/useBrowserLocale";
import { tOptions } from "../../dictionary/createTFunction";
import { getLanguageDirection, isSameLanguage } from "generaltranslation";
import renderDefaultLanguage from "../helpers/renderDefaultLanguage";
import getDictionaryReference from "../../primitives/dictionary/getDictionaryReference";
import renderClientChildren from "../helpers/renderClientChildren";
import getEntryTranslationType from "../../primitives/rendering/getEntryTranslationType";
import getEntryMetadata from "../../primitives/rendering/getEntryMetadata";
import ClientPlural from "../plural/ClientPlural";
import addGTIdentifier from "../../primitives/translation/addGTIdentifier";

export default function GTClientProvider({
    children, 
    projectID,
    dictionary = defaultGTProps.dictionary, 
    dictionaryName = defaultGTProps.dictionaryName,
    approvedLocales, defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale, 
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

    if (!projectID && remoteSource && cacheURL === defaultGTProps.cacheURL) {
        throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.")
    }

    const browserLocale = useBrowserLocale(defaultLocale);
    locale = locale || browserLocale;
    
    const [loaded, setLoaded] = useState({
        local: false,
        remote: false
    });
    
    const translationRequired = isSameLanguage(locale, defaultLocale) ? false : true;

    const suppliedDictionary = useMemo(() => {
        let processedDictionary: any = {};
        for (const id of Object.keys(dictionary)) {
            let { entry, metadata } = getEntryMetadata(dictionary[id]);
            const translationType = getEntryTranslationType(dictionary[id]);
            if (translationType === "t") {
                entry = <React.Fragment key={id}>{entry}</React.Fragment>;
            } else if (translationType === "plural") {
                entry = (
                    <ClientPlural
                        key={id} 
                        n={1}
                        {...metadata}
                    >
                        {entry}
                    </ClientPlural>
                );
            }
            const taggedEntry = addGTIdentifier(entry);
            processedDictionary[id] = taggedEntry;
        }
        return processedDictionary;
    }, [dictionary, translationRequired])

    const [localDictionary, setLocalDictionary] = useState<Record<string, any> | null>(null);
    useEffect(() => {
        if (locale) {
            if (translations && translations[locale] && translationRequired) {
                translations[locale]().then(setLocalDictionary).then(() => setLoaded(prev => ({ ...prev, local: true })));
            } 
            else {
                setLoaded(prev => ({ ...prev, local: true }))
            }
        }
    }, [translations, locale])


    const [remoteTranslations, setRemoteTranslations] = useState<Record<string, any> | null>(null);

    useEffect(() => {
        if (locale) {
            if (remoteSource && translationRequired) {
                const fetchRemoteTranslations = async () => {
                    try {
                        const response = await fetch(`${cacheURL}/${projectID}/${getDictionaryReference(locale, dictionaryName)}`);
                        const result = await response.json();
                        
                        if (Object.keys(result).length) {
                            setRemoteTranslations(result);
                        } else {
                            throw new Error(`No dictionary found in remote cache.`)
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoaded(prev => ({ ...prev, remote: true }));
                    }
                }
                fetchRemoteTranslations();
            } else {
                setLoaded(prev => ({ ...prev, remote: true }));
            }
        }
    }, [cacheURL, remoteSource, locale])

    const translate = useCallback((id: string, options?: tOptions) => {
        if (translationRequired) {
            if (localDictionary && localDictionary[id]) {
                return renderDefaultLanguage({ 
                    source: localDictionary[id], 
                    variables: options || {}, 
                    id, 
                    ...options 
                })
            }
            if (remoteTranslations && remoteTranslations[id] && remoteTranslations[id].t) {
                return renderClientChildren({
                    source: suppliedDictionary[id],
                    target: remoteTranslations[id].t,
                    locale, defaultLocale,
                    id, variables: options || {},
                })
            }
        } else {
            return renderDefaultLanguage({ source: suppliedDictionary[id], variables: options || {}, id, ...options })
        }
    }, [suppliedDictionary, translations, translationRequired, remoteTranslations]);

    return (
        <GTContext.Provider value={{
            translate, locale, defaultLocale
        }}>
            {
                Object.values(loaded).every(item => item ? true : false) &&
                children
            }
        </GTContext.Provider>
    )
    

}