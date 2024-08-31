"use strict";
'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GTContext = void 0;
exports.default = ClientProvider;
exports.useGTContext = useGTContext;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var handleRender_1 = __importDefault(require("./helpers/handleRender"));
var renderDefaultLanguage_1 = __importDefault(require("./helpers/renderDefaultLanguage"));
exports.GTContext = (0, react_1.createContext)(undefined);
function ClientProvider(_a) {
    var children = _a.children, locale = _a.locale, defaultLocale = _a.defaultLocale, dictionary = _a.dictionary, translations = _a.translations, translationRequired = _a.translationRequired;
    var translate = (0, react_1.useCallback)(function (id, options) {
        if (translationRequired) {
            return (0, handleRender_1.default)({
                source: dictionary[id],
                target: translations[id],
                locale: locale,
                defaultLocale: defaultLocale,
                variables: (options === null || options === void 0 ? void 0 : options.values) || {},
                id: id
            });
        }
        return (0, renderDefaultLanguage_1.default)(__assign({ source: dictionary[id], variables: (options === null || options === void 0 ? void 0 : options.values) || {}, id: id }, options));
    }, [dictionary, translations]);
    return ((0, jsx_runtime_1.jsx)(exports.GTContext.Provider, { value: {
            translate: translate,
            locale: locale,
            defaultLocale: defaultLocale
        }, children: children }));
}
/**
 * Custom hook to use the GTContext
 * @returns {GTContextType} The context value
 */
function useGTContext() {
    var context = (0, react_1.useContext)(exports.GTContext);
    if (context === undefined) {
        throw new Error('useGTContext must be used within a GTProvider');
    }
    return context;
}
//# sourceMappingURL=ClientProvider.js.map