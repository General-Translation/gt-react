'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback } from "react";
export const GTContext = createContext(undefined);
export default function ClientProvider({ children, locale, defaultLocale, dictionary }) {
    const translate = useCallback((id) => {
        return dictionary[id];
    }, [dictionary]);
    return (_jsx(GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: children }));
}
//# sourceMappingURL=ClientProvider.js.map