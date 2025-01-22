import useGTContext from "../provider/GTContext";
import { createNoEntryWarning } from "../messages/createMessages";
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
export default function useGT(id) {
    if (id === void 0) { id = ''; }
    // Create a prefix for translation keys if an id is provided
    var getId = function (suffix) {
        return id ? "".concat(id, ".").concat(suffix) : suffix;
    };
    // Get the translation context
    var translateDictionaryEntry = useGTContext("useGT('".concat(id, "'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.")).translateDictionaryEntry;
    /**
    * Translates a dictionary item based on its `id` and options.
    *
    * @param {string} [id=''] - The ID of the item in the dictionary to translate.
    * @param {Record<string, any>} [options={}] - Variables or parameters (e.g., `n`) passed into the translation for dynamic content.
    *
    * @returns {React.ReactNode}
    */
    function t(id, options) {
        if (id === void 0) { id = ''; }
        if (options === void 0) { options = {}; }
        console.log('brian');
        var prefixedId = getId(id);
        if (translateDictionaryEntry) {
            var translation = translateDictionaryEntry(prefixedId, options);
            if (!translation)
                console.warn(createNoEntryWarning(id, prefixedId));
            return translation;
        }
    }
    ;
    return t;
}
//# sourceMappingURL=useGT.js.map