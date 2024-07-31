import { isSameLanguage } from "generaltranslation";

/**
 * LocalDictionaryManager is responsible for managing dictionaries loaded from local file paths.
 * @class
 */
export default class LocalDictionaryManager {
    private translations: Record<string, () => Promise<Record<string, any>>>;
    private localeCache: Map<string, string>;
    private dictionaryMap: Map<string, Record<string, any>>;
    private fetchPromises: Map<string, Promise<Record<string, any> | null>>;

    /**
     * Creates an instance of LocalDictionaryManager.
     * @param {Object} params - Parameters object.
     * @param {Record<string, () => Promise<Record<string, any>>>} params.translations - A mapping of locale to a function that imports the corresponding dictionary.
     */
    constructor({ translations }: { translations: Record<string, () => Promise<Record<string, any>>> }) {
        this.translations = translations;
        this.localeCache = new Map();
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
    }

    /**
     * Retrieves a dictionary based on locale.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    async getDictionary(locale: string): Promise<Record<string, any> | null> {
        // Check if the dictionary is already cached
        if (this.dictionaryMap.has(locale)) {
            return this.dictionaryMap.get(locale) || null;
        }

        // Check if there is an ongoing fetch for this locale
        if (this.fetchPromises.has(locale)) {
            return await this.fetchPromises.get(locale) || null;
        }

        // Resolve the final locale
        let finalLocale = locale;
        if (!this.translations[finalLocale]) {
            finalLocale = this.localeCache.get(locale) || '';
            if (!finalLocale) {
                for (const key of Object.keys(this.translations)) {
                    if (isSameLanguage(key, locale)) {
                        finalLocale = key;
                        break;
                    }
                }
                this.localeCache.set(locale, finalLocale);
            }
        }

        // If no valid finalLocale is found, return null
        if (!finalLocale || !this.translations[finalLocale]) {
            return null;
        }

        // Fetch the dictionary and cache the result
        const fetchPromise = this._fetchDictionary(finalLocale);
        this.fetchPromises.set(locale, fetchPromise);

        const retrievedDictionary = await fetchPromise;
        this.fetchPromises.delete(locale);

        if (retrievedDictionary) {
            this.dictionaryMap.set(locale, retrievedDictionary);
        }

        return retrievedDictionary;
    }

    /**
     * Fetches a dictionary from the translations object using the provided function.
     * @param {string} locale - The locale of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary data or null if not found.
     */
    private async _fetchDictionary(locale: string): Promise<Record<string, any> | null> {
        try {
            const loadDictionary = this.translations[locale];
            if (!loadDictionary) throw new Error(`No translation function for locale: ${locale}`);
            const dictionary = await loadDictionary();
            return dictionary;
        } catch (error) {
            console.error(`Error loading dictionary for locale ${locale}:`, error);
            return null;
        }
    }
}
