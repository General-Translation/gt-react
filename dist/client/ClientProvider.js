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
var addGTIdentifier_1 = __importDefault(require("../internal/addGTIdentifier"));
var getEntryMetadata_1 = __importDefault(require("../dictionary/getEntryMetadata"));
var generaltranslation_1 = require("generaltranslation");
exports.GTContext = (0, react_1.createContext)(undefined);
function ClientProvider(_a) {
    var children = _a.children, locale = _a.locale, defaultLocale = _a.defaultLocale, dictionary = _a.dictionary, translations = _a.translations, translationRequired = _a.translationRequired;
    var translate = (0, react_1.useCallback)(function (id, options, f) {
        if (options === void 0) { options = {}; }
        var _a = (0, getEntryMetadata_1.default)(dictionary[id]), entry = _a.entry, metadata = _a.metadata;
        if (metadata && metadata.isFunction && typeof f === 'function') {
            entry = (0, addGTIdentifier_1.default)(f(options));
        }
        if (translationRequired) {
            if (typeof entry === 'string') {
                return (0, generaltranslation_1.renderContentToString)(translations[id], [locale, defaultLocale], options, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) ? metadata.variableOptions : undefined));
            }
            return (0, handleRender_1.default)(__assign({ source: entry, target: translations[id], locale: locale, defaultLocale: defaultLocale, variables: options, id: id }, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) && { variableOptions: metadata.variableOptions })));
        }
        if (typeof entry === 'string') {
            return (0, generaltranslation_1.renderContentToString)(entry, [locale, defaultLocale], options, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) ? metadata.variableOptions : undefined));
        }
        return (0, renderDefaultLanguage_1.default)(__assign({ source: entry, variables: options, id: id }, ((metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) && { variableOptions: metadata.variableOptions })));
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