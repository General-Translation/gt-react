/**
 * LocalDictionaryManager is responsible for managing dictionaries loaded from local file paths.
 * @class
 */
export default class LocalDictionaryManager {
    private translations;
    private localeCache;
    private dictionaryMap;
    private fetchPromises;
    /**
     * Creates an instance of LocalDictionaryManager.
     * @param {Object} params - Parameters object.
     * @param {Record<string, () => Promise<Record<string, any>>>} params.translations - A mapping of locale to a function that imports the corresponding dictionary.
     */
    constructor({ translations }: {
        translations: Record<string, () => Promise<Record<string, any>>>;
    });
    /**
     * Retrieves a dictionary based on locale.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    getDictionary(locale: string): Promise<Record<string, any> | null>;
    /**
     * Fetches a dictionary from the translations object using the provided function.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary data or null if not found.
     */
    private _fetchDictionary;
}
//# sourceMappingURL=LocalDictionaryManager.d.ts.map