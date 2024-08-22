"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.GTContext = void 0;
exports.default = ClientProvider;
exports.useGTContext = useGTContext;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.GTContext = (0, react_1.createContext)(undefined);
function ClientProvider({ children, locale, defaultLocale, dictionary }) {
    const translate = (0, react_1.useCallback)((id) => {
        return dictionary[id];
    }, [dictionary]);
    return ((0, jsx_runtime_1.jsx)(exports.GTContext.Provider, { value: {
            translate, locale, defaultLocale
        }, children: children }));
}
/**
 * Custom hook to use the GTContext
 * @returns {GTContextType} The context value
 */
function useGTContext() {
    const context = (0, react_1.useContext)(exports.GTContext);
    if (context === undefined) {
        throw new Error('useGTContext must be used within a GTProvider');
    }
    return context;
}
//# sourceMappingURL=ClientProvider.js.map