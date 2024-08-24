"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDictionaryReference;
/**
 * Generates a dictionary reference string from locale and dictionary name.
 * @param {string} locale - The locale of the dictionary.
 * @param {string} dictionaryName - The name of the dictionary.
 * @returns {string} The encoded dictionary reference.
 */
function getDictionaryReference(locale, dictionaryName) {
    return `${encodeURIComponent(dictionaryName)}/${encodeURIComponent(locale)}`;
}
//# sourceMappingURL=getDictionaryReference.js.map