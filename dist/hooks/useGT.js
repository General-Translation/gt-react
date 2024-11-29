"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGT = useGT;
exports.useElement = useElement;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var GTContext_1 = __importDefault(require("../provider/GTContext"));
var createErrors_1 = require("../errors/createErrors");
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
 * const t = useGT();
 * console.log(t('hello')); // Translates item 'hello'
 */
function useGT(id) {
    if (id === void 0) { id = ''; }
    // Create a prefix for translation keys if an id is provided
    var getID = function (suffix) {
        return id ? "".concat(id, ".").concat(suffix) : suffix;
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
        if (translate) {
            var translation = translate(prefixedID, options, f);
            if (!translation)
                console.warn((0, createErrors_1.createNoEntryWarning)(id, prefixedID));
            return translation;
        }
        return undefined;
    }
    ;
    return t;
}
/**
 * `useElement()` hook which gets the translation function `t()` provided by `<GTProvider>`.
 *
 * **`t()` returns only JSX elements.** For returning strings as well, see `useGT()`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 *
 * @example
 * const t = useElement('user');
 * console.log(t('name')); // Translates item 'user.name', returns it as a JSX element
 *
 * const t = useElement();
 * console.log(t('hello')); // Translates item 'hello', returns it as a JSX element
 */
function useElement(id) {
    if (id === void 0) { id = ''; }
    // Create a prefix for translation keys if an id is provided
    var getID = function (suffix) {
        return id ? "".concat(id, ".").concat(suffix) : suffix;
    };
    // Get the translation context
    var translate = (0, GTContext_1.default)("useElement('".concat(id, "'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.")).translate;
    /**
    * Translates a dictionary item based on its `id` and options.
    * Always returns a JSX.Element. Returns a fragment if there is no translation.
    *
    * @param {string} [id=''] - The ID of the item in the dictionary to translate.
    * @param {Record<string, any>} [options={}] - Variables or parameters (e.g., `n`) passed into the translation for dynamic content.
    * @param {Function} [f] - `f` is executed with `options` as parameters, and its result is translated based on the dictionary value of `id`. You likely don't need this parameter unless you are using `gt-next`.
    *
    * @returns {JSX.Element}
    */
    function t(id, options, f) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        var prefixedID = getID(id);
        if (translate) {
            var translation = translate(prefixedID, options, f);
            if (!translation)
                console.warn((0, createErrors_1.createNoEntryWarning)(id, prefixedID));
            if (!(0, react_1.isValidElement)(translation))
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: translation });
            return translation;
        }
        return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, {});
    }
    ;
    return t;
}
//# sourceMappingURL=useGT.js.map