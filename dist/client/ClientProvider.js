'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext } from "react";
export const GTContext = createContext(undefined);
export default function ClientProvider({ children, locale, defaultLocale, dictionary }) {
    const translate = useCallback((id) => {
        return dictionary[id];
    }, [dictionary]);
    return (_jsx(GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: children }));
}
/**
 * Custom hook to use the GTContext
 * @returns {GTContextType} The context value
 */
export function useGTContext() {
    const context = useContext(GTContext);
    if (context === undefined) {
        throw new Error('useGTContext must be used within a GTProvider');
    }
    return context;
}
//# sourceMappingURL=ClientProvider.js.map