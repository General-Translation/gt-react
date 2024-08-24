"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GTContext = void 0;
exports.default = ClientProvider;
exports.useGTContext = useGTContext;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const getRenderAttributes_1 = __importDefault(require("../primitives/rendering/getRenderAttributes"));
const handleRender_1 = __importDefault(require("./helpers/handleRender"));
const renderDefaultLanguage_1 = __importDefault(require("./helpers/renderDefaultLanguage"));
exports.GTContext = (0, react_1.createContext)(undefined);
function ClientProvider({ children, locale, defaultLocale, dictionary, translations, renderSettings, translationRequired }) {
    const translate = (0, react_1.useCallback)((id, options) => {
        const { n, values } = options || {};
        const variables = Object.assign(Object.assign({}, (typeof n === 'number' && { n })), (values && Object.assign({}, values)));
        if (translationRequired) {
            return (0, handleRender_1.default)({
                source: dictionary[id],
                target: translations[id],
                locale, defaultLocale,
                renderAttributes: (0, getRenderAttributes_1.default)({ locale }),
                variables
            });
        }
        return (0, renderDefaultLanguage_1.default)(Object.assign({ source: dictionary[id], variables, id }, options));
    }, [dictionary, translations]);
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