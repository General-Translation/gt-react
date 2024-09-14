"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useGT;
var GTContext_1 = __importDefault(require("../provider/GTContext"));
/**
 * Gets the translation function `t` provided by `<GTProvider>`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 *
 * @example
 * const t = useGT('user');
 * console.log(t('name')); // Translates item 'user.name'
 *
 * const t = useTranslation();
 * console.log(t('hello')); // Translates item 'hello'
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
    /**
    * Translates a dictionary item based on its `id` and options.
    *
    * @param {string} [id=''] - The ID of the item in the dictionary to translate.
    * @param {Record<string, any>} [options={}] - Variables or parameters (e.g., `n`) passed into the translation for dynamic content.
    * @param {Function} [f] - `f` is executed with `options` as parameters, and its result is translated based on the dictionary value of `id`. You likely don't need this parameter unless you are using `gt-next`.
    *
    * @returns {string | JSX.Element}
    */
    function t(id, options, f) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        var prefixedID = getID(id);
        var translation = translate(prefixedID, options, f);
        if (!translation)
            console.warn("t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedID, " !"));
        return translation;
    }
    ;
    return t;
}
//# sourceMappingURL=useGT.js.map