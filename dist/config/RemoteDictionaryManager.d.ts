/**
 * Configuration type for RemoteDictionaryManager.
 */
type RemoteDictionaryConfig = {
    cacheURL: string;
    projectID: string;
};
/**
 * Manages remote dictionaries for translation purposes.
 */
export declare class RemoteDictionaryManager {
    private config;
    private dictionaryMap;
    private fetchPromises;
    /**
     * Creates an instance of RemoteDictionaryManager.
     */
    constructor();
    /**
     * Sets the configuration for the RemoteDictionaryManager.
     * @param {Partial<RemoteDictionaryConfig>} newConfig - The new configuration to apply.
     */
    setConfig(newConfig: Partial<RemoteDictionaryConfig>): void;
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
    getDictionary(locale: string, dictionaryName: string): Promise<Record<string, any> | null>;
    /**
     * Sets a new entry in the specified dictionary.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @param {string} key - The key for the new entry.
     * @param {string} [id=key] - The id for the new entry, defaults to key if not provided.
     * @param {any} translation - The translation value.
     * @returns {boolean} True if the entry was set successfully, false otherwise.
     */
    setDictionary(locale: string, dictionaryName: string, key: string, id: string | undefined, translation: any): boolean;
}
declare const remoteDictionaryManager: RemoteDictionaryManager;
export default remoteDictionaryManager;
//# sourceMappingURL=RemoteDictionaryManager.d.ts.map