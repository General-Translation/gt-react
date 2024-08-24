/**
 * Generates a dictionary reference string from locale and dictionary name.
 * @param {string} locale - The locale of the dictionary.
 * @param {string} dictionaryName - The name of the dictionary.
 * @returns {string} The encoded dictionary reference.
 */
export default function getDictionaryReference(locale: string, dictionaryName: string): string {
    return `${encodeURIComponent(dictionaryName)}/${encodeURIComponent(locale)}`;
}