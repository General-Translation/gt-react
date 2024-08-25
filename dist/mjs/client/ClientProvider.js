'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext } from "react";
import getRenderAttributes from "../primitives/rendering/getRenderAttributes";
import handleRender from "./helpers/handleRender";
import renderDefaultLanguage from "./helpers/renderDefaultLanguage";
export const GTContext = createContext(undefined);
export default function ClientProvider({ children, locale, defaultLocale, dictionary, translations, renderSettings, translationRequired }) {
    const translate = useCallback((id, options) => {
        const { n, values } = options || {};
        const variables = Object.assign(Object.assign({}, (typeof n === 'number' && { n })), (values && Object.assign({}, values)));
        if (translationRequired) {
            return handleRender({
                source: dictionary[id],
                target: translations[id],
                locale, defaultLocale,
                renderAttributes: getRenderAttributes({ locale }),
                variables, id
            });
        }
        return renderDefaultLanguage(Object.assign({ source: dictionary[id], variables, id }, options));
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