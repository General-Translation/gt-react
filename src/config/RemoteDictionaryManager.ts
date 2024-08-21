import getDictionaryReference from "../primitives/getDictionaryReference";

/**
 * Configuration type for RemoteDictionaryManager.
 */
type RemoteDictionaryConfig = {
    cacheURL: string;
    projectID: string;
}

/**
 * Manages remote dictionaries for translation purposes.
 */
export class RemoteDictionaryManager {
    private config: RemoteDictionaryConfig;
    private dictionaryMap: Map<string, Record<string, any>>;
    private fetchPromises: Map<string, Promise<Record<string, any> | null>>;
    private requestedTranslations: Map<string, boolean>;

    /**
     * Creates an instance of RemoteDictionaryManager.
     */
    constructor() {
        this.config = {
            cacheURL: "https://cache.gtx.dev",
            projectID: ""
        };
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
        this.requestedTranslations = new Map();
    }

    /**
     * Sets the configuration for the RemoteDictionaryManager.
     * @param {Partial<RemoteDictionaryConfig>} newConfig - The new configuration to apply.
     */
    setConfig(newConfig: Partial<RemoteDictionaryConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }

    /**
     * Fetches a dictionary from the remote cache.
     * @param {string} reference - The dictionary reference.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary or null if not found.
     */
    private async _fetchDictionary(reference: string): Promise<Record<string, any> | null> {
        try {
            const response = await fetch(`${this.config.cacheURL}/${this.config.projectID}/${reference}`);
            const result = await response.json();
            if (Object.keys(result).length) {
                return result;
            }
        } catch (error) {
            console.error('Remote dictionary error:', error);
        }
        return null;
    }

    /**
     * Retrieves a dictionary based on locale and dictionary name.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    async getDictionary(locale: string, dictionaryName: string): Promise<Record<string, any> | null> {
        const reference = getDictionaryReference(locale, dictionaryName);
        if (this.dictionaryMap.has(reference)) {
            return this.dictionaryMap.get(reference) || null;
        }
        if (this.fetchPromises.has(reference)) {
            return await this.fetchPromises.get(reference) || null;
        }

        const fetchPromise = this._fetchDictionary(reference);
        this.fetchPromises.set(reference, fetchPromise);

        const retrievedDictionary = await fetchPromise;
        this.fetchPromises.delete(reference);

        if (retrievedDictionary) {
            this.dictionaryMap.set(reference, retrievedDictionary);
        }
        return retrievedDictionary;
    }

    /**
     * Sets a new entry in the specified dictionary.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @param {string} key - The key for the new entry.
     * @param {string} [id=key] - The id for the new entry, defaults to key if not provided.
     * @param {any} translation - The translation value.
     * @returns {boolean} True if the entry was set successfully, false otherwise.
     */
    setDictionary(locale: string, dictionaryName: string, key: string, id: string = key, translation: any): boolean {
        if (!(locale && dictionaryName && key && id && translation)) return false;
        const reference = getDictionaryReference(locale, dictionaryName);
        const currentDictionary = this.dictionaryMap.get(reference) || {};
        this.dictionaryMap.set(reference, { ...currentDictionary, [id]: { k: key, t: translation }});
        return true;
    }

    /**
     * Marks a translation as requested for a given locale and dictionary
     */
    setTranslationRequested(locale: string, dictionaryName: string) {
        const reference = getDictionaryReference(locale, dictionaryName);
        this.requestedTranslations.set(reference, true);
    }

    /**
     * Checks if a translation has been requested for a given locale and dictionary
     */
    getTranslationRequested(locale: string, dictionaryName: string): boolean {
        const reference = getDictionaryReference(locale, dictionaryName);
        return this.requestedTranslations.get(reference) ? true : false;
    }
    
}

const remoteDictionaryManager = new RemoteDictionaryManager();
export default remoteDictionaryManager;