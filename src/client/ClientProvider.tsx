'use client'

import { createContext, useCallback, useContext } from "react"

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