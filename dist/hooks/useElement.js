import { jsx as _jsx } from "react/jsx-runtime";
import React, { isValidElement } from "react";
import { createNoEntryWarning } from "../messages/createMessages";
import useGTContext from "../provider/GTContext";
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
export default function useElement(id) {
    if (id === void 0) { id = ''; }
    // Create a prefix for translation keys if an id is provided
    var getId = function (suffix) {
        return id ? "".concat(id, ".").concat(suffix) : suffix;
    };
    // Get the translation context
    var translateDictionaryEntry = useGTContext("useElement('".concat(id, "'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.")).translateDictionaryEntry;
    /**
    * Translates a dictionary item based on its `id` and options.
    * Always returns a React.JSX.Element. Returns a fragment if there is no translation.
    *
    * @param {string} [id=''] - The ID of the item in the dictionary to translate.
    * @param {Record<string, any>} [options={}] - Variables or parameters (e.g., `n`) passed into the translation for dynamic content.
    *
    * @returns {JSX.Element}
    */
    function t(id, options) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        var prefixedId = getId(id);
        if (translateDictionaryEntry) {
            var translation = translateDictionaryEntry(prefixedId, options);
            if (!translation)
                console.warn(createNoEntryWarning(id, prefixedId));
            if (!isValidElement(translation))
                return _jsx(React.Fragment, { children: translation }, prefixedId);
            return translation;
        }
        return _jsx(React.Fragment, {}, prefixedId);
    }
    ;
    return t;
}
//# sourceMappingURL=useElement.js.map