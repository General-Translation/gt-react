import GT, { isSameLanguage, getLanguageName } from "generaltranslation";
import DictionaryManager from "./DictionaryManager";
import getDictionaryEntry from "../dictionary/getDictionaryEntry";

type I18NConfigurationParams = {
    apiKey: string;
    projectID: string;
    cacheURL: string;
    baseURL: string, 
    getLocale: () => string;
    defaultLocale: string, 
    approvedLocales?: string[],
    renderMethod: string, 
    dictionary: Record<string, any>, 
    dictionaryName: string;
    maxConcurrentRequests: number;
    batchInterval: number;
    [key: string]: any;
}

export default class I18NConfiguration {
    // Cloud integration
    apiKey: string;
    projectID: string;
    // Locale info
    getLocale: () => string;
    defaultLocale: string;
    approvedLocales: string[] | undefined;
    // Rendering
    renderMethod: string;
    // Dictionaries
    dictionaryName: string;
    dictionary: Record<string, any>;
    private _dictionaryManager: DictionaryManager; // Dictionary manager
    // GT
    gt: GT;
    // Other metadata
    metadata: Record<string, any>
    // Batching config
    maxConcurrentRequests: number;
    batchInterval: number;
    private _queue: Array<any>;
    private _activeRequests: number;
    // Cache for ongoing translation requests
    private _translationCache: Map<string, Promise<any>>;

    constructor({
        // Cloud integration
        apiKey, projectID,
        baseURL, cacheURL, 
        // Locale info
        getLocale,
        defaultLocale,
        approvedLocales,
        // Render method
        renderMethod,
        // Dictionaries
        dictionary, dictionaryName,
        // Batching config
        maxConcurrentRequests, batchInterval,
        // Other metadata
        ...metadata
    }: I18NConfigurationParams) {
        // Cloud integration
        this.apiKey = apiKey;
        this.projectID = projectID;
        // Locales
        this.getLocale = getLocale;
        this.defaultLocale = defaultLocale;
        this.approvedLocales = approvedLocales;
        // Render method
        this.renderMethod = renderMethod;
        // Dictionaries
        this.dictionary = dictionary;
        this.dictionaryName = dictionaryName;
        // GT
        this.gt = new GT({ projectID, apiKey, defaultLanguage: defaultLocale, baseURL });
        // Other metadata
        this.metadata = { projectID: this.projectID, defaultLanguage: this.defaultLocale, dictionaryName, ...metadata };
        // Dictionary manager
        this._dictionaryManager = new DictionaryManager({
            cacheURL: cacheURL,
            projectID: this.projectID
        });
        // Batching
        this.maxConcurrentRequests = maxConcurrentRequests;
        this.batchInterval = batchInterval;
        this._queue = [];
        this._activeRequests = 0;
        this._translationCache = new Map(); // cache for ongoing promises, so things aren't translated twice
        this._startBatching();
    }

    /**
     * Gets the application's default locale
     * @returns {string} A BCP-47 language tag
    */
    getDefaultLocale(): string {
        return this.defaultLocale;
    }

    /**
     * Gets the list of approved locales for this app
     * @returns {string[] | undefined} A list of BCP-47 language tags, or undefined if none were provided
    */
    getApprovedLocales(): string[] | undefined {
        return this.approvedLocales;
    }

    /**
     * Get dictionary
     * @returns The entire dictionary, or an empty object if none found
    */
    getDictionary(): Record<string, any> {
        return this.dictionary;
    }


    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    getDictionaryEntry(id: string): any {
        return getDictionaryEntry(id, this.dictionary);
    }

    /**
     * Get the render method
     * @returns The current render method. As of 7/26/24: "replace", "hang", "subtle"
    */
    getRenderMethod(): string {
        return this.renderMethod;
    }

    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    translationRequired(locale: string): boolean {
        if (!this.apiKey || !this.projectID || !locale) return false;
        if (this.approvedLocales && !this.approvedLocales.some(approvedLocale => isSameLanguage(locale, approvedLocale))) return false;
        if (getLanguageName(locale) === getLanguageName(this.defaultLocale)) return false;
        return true;
    }

    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    async getTranslations(locale: string, dictionaryName: string = this.dictionaryName): Promise<Record<string, any> | null> {
        return await this._dictionaryManager.getDictionary(locale, dictionaryName);
    }

    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the a value in the translations..
    */
    async getTranslation(locale: string, key: string, id: string = key, dictionaryName: string = this.dictionaryName): Promise<any | null> {
        const translations = await this.getTranslations(locale, dictionaryName);
        if (translations && translations[id] && translations[id].k === key) return translations[id].t;
        return null;
    }
   
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    async intl(params: any): Promise<string> {
        const cacheKey = JSON.stringify(params);
        if (this._translationCache.has(cacheKey)) {
            return this._translationCache.get(cacheKey);
        }
        const translationPromise = new Promise<string>((resolve, reject) => {
            this._queue.push({
                type: "intl",
                data: {
                    content: params.content,
                    targetLanguage: params.targetLanguage,
                    projectID: this.projectID,
                    metadata: { ...params.options, ...this.metadata }
                },
                resolve,
                reject
            });
        });
        this._translationCache.set(cacheKey, translationPromise);
        return translationPromise.finally(() => this._translationCache.delete(cacheKey));
    }
   
    /**
     * Translate the children components
     * @param params - Parameters for translation
     * @returns A promise that resolves when translation is complete
    */
    async translateChildren(params: any): Promise<any> {
        const cacheKey = JSON.stringify(params);
        if (this._translationCache.has(cacheKey)) {
            return this._translationCache.get(cacheKey);
        }
        const translationPromise = new Promise<any>((resolve, reject) => {
            this._queue.push({
                type: "react",
                data: {
                    children: params.children,
                    targetLanguage: params.targetLanguage,
                    metadata: { ...params.metadata, ...this.metadata }
                },
                resolve,
                reject
            });
        });
        this._translationCache.set(cacheKey, translationPromise);
        return translationPromise.finally(() => this._translationCache.delete(cacheKey));
    }

    /**
     * Send a batch request for React translation
     * @param batch - The batch of requests to be sent
     */
    private async _sendBatchRequest(batch: Array<any>): Promise<void> {
        this._activeRequests++;
        try {
            const results = await this.gt.bundleRequests(batch);
            batch.forEach((item, index) => {
                const result = results[index];
                if (!result || result.error) return resolveBatchError(item);
                if (result && typeof result === 'object') {
                    item.resolve(result.translation);
                    if (result.translation && result.language && result.reference) {
                        this._dictionaryManager.setDictionary(
                            result.language,
                            result.reference.dictionaryName,
                            result.reference.key,
                            result.reference.id,
                            result.translation
                        );
                    }
                }
            });
        } catch (error) {
            console.error(error);
            batch.forEach(resolveBatchError);
        } finally {
            this._activeRequests--;
        }
    }

    /**
     * Start the batching process with a set interval
    */
    private _startBatching(): void {
        setInterval(() => {
            if (this._queue.length > 0 && this._activeRequests < this.maxConcurrentRequests) {
                this._sendBatchRequest(this._queue);
                this._queue = [];
            }
        }, this.batchInterval);
    }

}

// Resolve errors in the batch request
const resolveBatchError = (item: any) => {
    if (item.type === "react") return item.resolve(item.data.children);
    if (item.type === "intl") return item.resolve(item.data.content)
    return item.resolve("");
}