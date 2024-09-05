'use client'

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { tOptions } from "../dictionary/createTFunction";
import handleRender from "./helpers/handleRender";
import renderDefaultLanguage from "./helpers/renderDefaultLanguage";
import addGTIdentifier from "../primitives/translation/addGTIdentifier";

type GTContextType = {
    [key: string]: any
}
export const GTContext = createContext<GTContextType | undefined>(undefined);

type ClientProviderProps = {
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary: Record<string, any>;
    [key: string]: any;
}
export default function ClientProvider({
    children, 
    locale, defaultLocale, 
    dictionary, translations, 
    translationRequired
}: ClientProviderProps) {

    const translate = useCallback((id: string, options: tOptions = {}, f?: Function) => {
        let entry = dictionary[id];
        if (typeof entry === 'object' && entry.function) {
            if (typeof f === 'function') {
                entry = addGTIdentifier(f(options));
            } else {
                entry = entry.defaultChildren;
            }
        }
        if (translationRequired) {
            return handleRender({
                source: entry,
                target: translations[id],
                locale, defaultLocale,
                variables: options, id
            })
        }
        return renderDefaultLanguage({ source: entry, variables: options || {}, id, ...options })
    }, [dictionary, translations]);

    return (
        <GTContext.Provider value={{
            translate, locale, defaultLocale
        }}>
            {children}
        </GTContext.Provider>
    );
}

/**
 * Custom hook to use the GTContext
 * @returns {GTContextType} The context value
 */
export function useGTContext(): GTContextType {
    const context = useContext(GTContext);
    if (context === undefined) {
        throw new Error('useGTContext must be used within a GTProvider');
    }
    return context;
}