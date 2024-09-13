/**
 * Generates a dictionary reference string from locale and dictionary name.
 * @param {string} locale - The locale of the dictionary.
 * @param {string} dictionaryName - The name of the dictionary.
 * @returns {string} The encoded dictionary reference.
 */
export declare function getDictionaryReference(locale: string, dictionaryName: string): string;
/**
 * Configuration type for RemoteTranslationsManager.
 */
type RemoteTranslationsConfig = {
    cacheURL: string;
    projectID: string;
};
/**
 * Manages remote dictionaries for translation purposes.
 */
export declare class RemoteTranslationsManager {
    private config;
    private dictionaryMap;
    private fetchPromises;
    private requestedTranslations;
    /**
     * Creates an instance of RemoteTranslationsManager.
     */
    constructor();
    /**
     * Sets the configuration for the RemoteDictionaryManager.
     * @param {Partial<RemoteDictionaryConfig>} newConfig - The new configuration to apply.
     */
    setConfig(newConfig: Partial<RemoteTranslationsConfig>): void;
    /**
     * Fetches a dictionary from the remote cache.
     * @param {string} reference - The dictionary reference.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary or null if not found.
     */
    private _fetchDictionary;
    /**
     * Retrieves a dictionary based on locale and dictionary name.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    getTranslations(locale: string, dictionaryName: string): Promise<Record<string, any> | null>;
    /**
     * Sets a new entry in the specified dictionary.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @param {string} key - The key for the new entry.
     * @param {string} [id=key] - The id for the new entry, defaults to key if not provided.
     * @param {any} translation - The translation value.
     * @returns {boolean} True if the entry was set successfully, false otherwise.
     */
    setTranslations(locale: string, dictionaryName: string, key: string, id: string | undefined, translation: any): boolean;
    /**
     * Marks a translation as requested for a given locale and dictionary
     */
    setTranslationRequested(locale: string, dictionaryName: string): void;
    /**
     * Checks if a translation has been requested for a given locale and dictionary
     */
    getTranslationRequested(locale: string, dictionaryName: string): boolean;
}
declare const remoteDictionaryManager: RemoteTranslationsManager;
export default remoteDictionaryManager;
//# sourceMappingURL=RemoteTranslationsManager.d.ts.map