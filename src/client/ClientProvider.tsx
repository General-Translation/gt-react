'use client'

import { createContext, useState, useCallback, useEffect } from "react"

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
    children, locale, defaultLocale, dictionary
}: ClientProviderProps) {

    const translate = useCallback((id: string) => {
        return dictionary[id];
    }, [dictionary]);

    return (
        <GTContext.Provider
            value={{
                translate, locale, defaultLocale
            }}
        >
            {children}
        </GTContext.Provider>
    );
}