"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ClientProvider_1 = require("../ClientProvider");
const createOptions_1 = __importDefault(require("../../dictionary/createOptions"));
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
function useGT(id = '') {
    // Create a prefix for translation keys if an id is provided
    const getID = (suffix) => {
        if (id && suffix)
            return `${id}.${suffix}`;
        return id ? id : suffix;
    };
    // Get the translation context
    let translate;
    try {
        ({ translate } = (0, ClientProvider_1.useGTContext)());
    }
    catch (_a) {
        throw new Error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }
    // Return a translation function if available, otherwise return a no-op function
    return (id = '', options) => {
        const prefixedID = getID(id);
        const translation = translate(prefixedID, (0, createOptions_1.default)(options));
        if (!translation)
            console.warn(`t('${id}') finding no translation for dictionary item ${prefixedID} !`);
        return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: translation }, prefixedID);
    };
}
//# sourceMappingURL=useGT.js.map