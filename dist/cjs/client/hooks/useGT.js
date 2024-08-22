"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ClientProvider_1 = require("../ClientProvider");
const ClientValue_1 = __importDefault(require("../value/ClientValue"));
const ClientPlural_1 = __importDefault(require("../plural/ClientPlural"));
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
function useGT(id) {
    // Create a prefix for translation keys if an id is provided
    const prefix = (0, react_1.useMemo)(() => {
        return id ? `${id}.` : '';
    }, [id]);
    // Get the translation context
    let translate;
    try {
        ({ translate } = (0, ClientProvider_1.useGTContext)());
    }
    catch (_a) {
        throw new Error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }
    // Return a translation function if available, otherwise return a no-op function
    return (id, options) => {
        const translation = translate(`${prefix}${id}`);
        // If a plural or value is required
        if (options) {
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options;
            if (typeof n === 'number') {
                const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
                if (values) {
                    // Plural + Value
                    return ((0, jsx_runtime_1.jsx)(ClientValue_1.default, { values: values, children: (0, jsx_runtime_1.jsx)(ClientPlural_1.default, Object.assign({ id: id }, innerProps, { children: translation })) }));
                }
                else {
                    // Plural only
                    return ((0, jsx_runtime_1.jsx)(ClientPlural_1.default, Object.assign({ id: id }, innerProps, { children: translation })));
                }
            }
            else if (values) {
                // Value only
                return ((0, jsx_runtime_1.jsx)(ClientValue_1.default, { id: id, values: values, children: translation }));
            }
        }
        if (!translation)
            console.warn(`t('${id}') finding no translation for dictionary item ${prefix}${id} !`);
        return translation;
    };
}
//# sourceMappingURL=useGT.js.map