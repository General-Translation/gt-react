"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ClientProvider_1 = require("../ClientProvider");
/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
function useGT(id) {
    if (id === void 0) { id = ''; }
    // Create a prefix for translation keys if an id is provided
    var getID = function (suffix) {
        if (id && suffix)
            return "".concat(id, ".").concat(suffix);
        return id ? id : suffix;
    };
    // Get the translation context
    var translate;
    try {
        (translate = (0, ClientProvider_1.useGTContext)().translate);
    }
    catch (_a) {
        throw new Error("t('".concat(id, "'): No context provided. useGT() can only be used inside a GTProvider."));
    }
    // Return a translation function if available, otherwise return a no-op function
    return function (id, options) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        var prefixedID = getID(id);
        var translation = translate(prefixedID, options);
        if (!translation)
            console.warn("t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedID, " !"));
        return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: translation }, prefixedID);
    };
}
//# sourceMappingURL=useGT.js.map