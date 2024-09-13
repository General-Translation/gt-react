"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
var GTContext_1 = __importDefault(require("../provider/GTContext"));
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
    var translate = (0, GTContext_1.default)("useGT('".concat(id, "'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.")).translate;
    // Return a translation function if available, otherwise return a no-op function
    return function (id, options, f) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        var prefixedID = getID(id);
        var translation = translate(prefixedID, options, f);
        if (!translation)
            console.warn("t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedID, " !"));
        return translation;
    };
}
//# sourceMappingURL=useGT.js.map