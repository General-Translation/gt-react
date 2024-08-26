'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext } from "react";
import handleRender from "./helpers/handleRender";
import renderDefaultLanguage from "./helpers/renderDefaultLanguage";
export const GTContext = createContext(undefined);
export default function ClientProvider({ children, locale, defaultLocale, dictionary, translations, translationRequired }) {
    const translate = useCallback((id, options) => {
        if (translationRequired) {
            return handleRender({
                source: dictionary[id],
                target: translations[id],
                locale, defaultLocale,
                variables: (options === null || options === void 0 ? void 0 : options.values) || {}, id
            });
        }
        return renderDefaultLanguage(Object.assign({ source: dictionary[id], variables: (options === null || options === void 0 ? void 0 : options.values) || {}, id }, options));
    }, [dictionary, translations]);
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