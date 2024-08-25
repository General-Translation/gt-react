'use client'

import { isSameLanguage } from "generaltranslation";
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import getEntryMetadata from "../primitives/rendering/getEntryMetadata";
import { tOptions } from "../dictionary/createTFunction";
import renderClientChildren from "./helpers/renderClientChildren";
import getRenderAttributes from "../primitives/rendering/getRenderAttributes";
import handleRender from "./helpers/handleRender";
import renderDefaultLanguage from "./helpers/renderDefaultLanguage";

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

    const translate = useCallback((id: string, options?: tOptions) => {
        const { n, values } = options || {};
        const variables = { ...(typeof n === 'number' && { n }), ...(values && { ...values }) };
        if (translationRequired) {
            return handleRender({
                source: dictionary[id],
                target: translations[id],
                locale, defaultLocale,
                renderAttributes: getRenderAttributes({ locale }),
                variables, id
            })
        }
        return renderDefaultLanguage({ source: dictionary[id], variables, id, ...options })
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

/*

const renderAttributes = getRenderAttributes({ locale });
        if (translationRequired) return handleRender({
            source: dictionary[id],
            target: translations[id], 
            renderSettings, renderAttributes,
            variables,
            ...other
        });

*/