// intended for purely client-side apps, put at the root of the project

'use client'

import React, { useEffect, useCallback, useState, useMemo } from "react";
import { GTContext } from "../ClientProvider"
import defaultGTProps from "../../types/defaultGTProps";
import useBrowserLocale from "../hooks/useBrowserLocale";
import { tOptions } from "../../dictionary/createTFunction";
import { isSameLanguage, renderContentToString, splitStringToContent } from "generaltranslation";
import renderDefaultLanguage from "../helpers/renderDefaultLanguage";
import getDictionaryReference from "../../dictionary/getDictionaryReference";
import renderClientChildren from "../helpers/renderClientChildren";
import getEntryTranslationType from "../../dictionary/getEntryTranslationType";
import getEntryMetadata from "../../dictionary/getEntryMetadata";
import ClientPlural from "../plural/ClientPlural";
import addGTIdentifier from "../../internal/addGTIdentifier";
import flattenDictionary from "../../internal/flattenDictionary";

/**
 * GTClientProvider component for providing translations to entirely client-side React apps.
 * 
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the provider.
 * @param {string} [props.projectID] - The project ID for remote translation services.
 * @param {Record<string, any>} [props.dictionary=defaultGTProps.dictionary] - The local dictionary for translations.
 * @param {string} [props.dictionaryName=defaultGTProps.dictionaryName] - The name of the dictionary.
 * @param {string[]} [props.approvedLocales] - The list of approved locales.
 * @param {string} [props.defaultLocale=approvedLocales?.[0] || defaultGTProps.defaultLocale] - The default locale.
 * @param {string} [props.locale=''] - The current locale.
 * @param {boolean} [props.remoteSource=defaultGTProps.remoteSource] - Flag indicating if remote source is used.
 * @param {string} [props.cacheURL=defaultGTProps.cacheURL] - The URL for caching translations.
 * @param {Record<string, () => Promise<Record<string, any>>>} [props.translations] - A local translations object.
 * 
 * @throws Will throw an error if projectID is not provided when remoteSource is true and cacheURL is the default.
 * 
 * @returns {JSX.Element} The GTClientProvider component.
*/
export default function GTClientProvider({
    children, 
    projectID,
    dictionary = defaultGTProps.dictionary, 
    dictionaryName = defaultGTProps.dictionaryName,
    approvedLocales, defaultLocale = approvedLocales?.[0] || defaultGTProps.defaultLocale, 
    locale = '', 
    remoteSource = defaultGTProps.remoteSource,
    cacheURL = defaultGTProps.cacheURL
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
}): JSX.Element {

    const suppliedDictionary = useMemo(() => flattenDictionary(dictionary), [dictionary])

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

    const translate = useCallback((id: string, options: tOptions = {}, f?: Function) => {

        let { entry, metadata } = getEntryMetadata(suppliedDictionary[id]);
        
        const { type: translationType, isFunction } = getEntryTranslationType(suppliedDictionary[id]);
        if (typeof f === 'function') {
            entry = f(options);
        } else if (isFunction) {
            entry = entry(options);
        }

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
        // if entry is "string", none of the above should have affected it

        if (translationRequired) {
            if (remoteTranslations && remoteTranslations[id] && remoteTranslations[id].t) {
                if (typeof entry === 'string') {
                    return renderContentToString(remoteTranslations[id], [locale, defaultLocale], options, (
                        metadata?.variableOptions ? metadata.variableOptions : undefined
                    ));
                }
                return renderClientChildren({
                    source: taggedEntry,
                    target: remoteTranslations[id].t,
                    locale, defaultLocale,
                    id, variables: options, 
                    ...(metadata?.variableOptions && { variables: metadata.variableOptions })
                })
            }
        } else {
            if (typeof entry === 'string') {
                return renderContentToString(entry, [locale, defaultLocale], options, (
                    metadata?.variableOptions ? metadata.variableOptions : undefined
                ));
            }
            return renderDefaultLanguage({ 
                source: taggedEntry, 
                id, variables: options, 
                ...(metadata?.variableOptions && { variables: metadata.variableOptions })
            })
        }
    }, [suppliedDictionary, translationRequired, remoteTranslations]);

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