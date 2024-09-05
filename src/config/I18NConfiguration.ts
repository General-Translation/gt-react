import GT, { isSameLanguage } from "generaltranslation";
import remoteDictionaryManager, { RemoteDictionaryManager } from "./RemoteDictionaryManager";
import getDictionaryEntry from "../dictionary/getDictionaryEntry";
import LocalDictionaryManager from "./LocalDictionaryManager";
import defaultGTProps from "../types/defaultGTProps";

type I18NConfigurationParams = {
    apiKey: string;
    projectID: string;
    cacheURL: string;
    baseURL: string, 
    remoteSource: boolean;
    automaticTranslation: boolean;
    getLocale: () => string;
    defaultLocale: string, 
    approvedLocales?: string[],
    renderPrevious: boolean,
    renderMethod: string, 
    renderTimeout: number | null,
    dictionary: Record<string, any>, 
    dictionaryName: string;
    storeByDefault?: boolean;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    maxConcurrentRequests: number;
    batchInterval: number;
    getMetadata: () => Record<string, any>;
    [key: string]: any;
}

export default class I18NConfiguration {
    // Cloud integration
    projectID: string;
    remoteSource: boolean;
    automaticTranslation: boolean;
    // Locale info
    getLocale: () => string;
    defaultLocale: string;
    approvedLocales: string[] | undefined;
    // Rendering
    renderPrevious: boolean;
    renderMethod: string;
    renderTimeout: number | null;
    // Dictionaries
    dictionaryName: string;
    dictionary: Record<string, any>;
    storeByDefault?: boolean;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    private _localDictionaryManager: LocalDictionaryManager | undefined;
    private _remoteDictionaryManager: RemoteDictionaryManager | undefined;
    // GT
    gt: GT;
    // Other metadata
    getMetadata: () => Record<string, any>;
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
        remoteSource, automaticTranslation,
        // Locale info
        getLocale,
        defaultLocale,
        approvedLocales,
        // Render method
        renderPrevious, renderMethod, renderTimeout,
        // Dictionaries
        dictionary, dictionaryName,
        storeByDefault,
        // Translations
        translations,
        // Batching config
        maxConcurrentRequests, batchInterval,
        // Other metadata
        getMetadata,
        ...metadata
    }: I18NConfigurationParams) {
        // Cloud integration
        this.projectID = projectID;
        this.remoteSource = (cacheURL && remoteSource) ? true : false;
        this.automaticTranslation = (baseURL && automaticTranslation && apiKey) ? true : false;
        // Validate required parameters
        if (!projectID && ((this.automaticTranslation && baseURL === defaultGTProps.baseURL) || (this.remoteSource && cacheURL === defaultGTProps.cacheURL))) {
            throw new Error("gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.");
        }
        // Locales
        this.getLocale = getLocale;
        this.defaultLocale = defaultLocale;
        this.approvedLocales = approvedLocales;
        // Render method
        this.renderPrevious = renderPrevious;
        this.renderMethod = renderMethod;
        this.renderTimeout = renderTimeout;
        // Dictionaries
        this.dictionary = dictionary;
        this.dictionaryName = dictionaryName;
        this.storeByDefault = storeByDefault;
        // Local translations
        this.translations = translations;
        // GT
        this.gt = new GT({ projectID, apiKey, defaultLanguage: defaultLocale, baseURL });
        // Other metadata
        this.getMetadata = getMetadata;
        this.metadata = { 
            projectID: this.projectID, 
            defaultLanguage: this.defaultLocale, 
            dictionaryName,
            ...(this.renderTimeout && { timeout: this.renderTimeout - batchInterval }),
            ...metadata
        };
        // Dictionary managers
        if (this.translations) {
            this._localDictionaryManager = new LocalDictionaryManager({
                translations: this.translations
            })
        }
        if (this.remoteSource) {
            this._remoteDictionaryManager = remoteDictionaryManager;
            this._remoteDictionaryManager.setConfig({
                cacheURL, projectID
            })
        }
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
     * Gets the name of the current dictionary
     * @returns {string} A BCP-47 language tag
    */
    getDictionaryName(): string {
        return this.dictionaryName;
    }

    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    getDictionaryEntry(id: string): any {
        return getDictionaryEntry(id, this.dictionary);
    }

    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    automaticTranslationEnabled(): boolean {
        return this.automaticTranslation;
    }

    /**
     * Get the rendering instructions
     * @returns An object containing the current method and timeout. 
     * As of 7/31/24: method is "skeleton", "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
     * renderPrevious determines whether a non-matching previous entry should be rendered while the new translation loads.
    */
    getRenderSettings(): { method: string, timeout: number | null, renderPrevious: boolean } {
        return {
            method: this.renderMethod,
            timeout: this.renderTimeout,
            renderPrevious: this.renderPrevious
        }
    }

    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    translationRequired(locale: string): boolean {
        if (!locale) return false;
        if (this.approvedLocales && !this.approvedLocales.some(approvedLocale => isSameLanguage(locale, approvedLocale))) return false;
        if (isSameLanguage(locale, this.defaultLocale)) return false;
        return true;
    }

    /**
     * Returns a boolean determining whether or not a translation should be stored
     * Undefined if not set
     * @returns {string} A BCP-47 language tag
    */
    shouldStore(): boolean | undefined {
        return this.storeByDefault
    }

    /**
     * Get the translation dictionaries for this user's locale, if they exist
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    async getTranslations(locale: string, dictionaryName: string = this.dictionaryName): Promise<{
        local?: any, remote?: any
    }> {
        let translations: { local?: any, remote?: any } = {};
        const localPromise = this._localDictionaryManager ? this._localDictionaryManager.getDictionary(locale) : Promise.resolve(undefined);
        const remotePromise = this._remoteDictionaryManager ? this._remoteDictionaryManager.getDictionary(locale, dictionaryName) : Promise.resolve(undefined);
        const [local, remote] = await Promise.all([localPromise, remotePromise]);
        if (local !== undefined) {
            translations.local = local;
        }
        if (remote !== undefined) {
            translations.remote = remote;
        }
        return translations;
    }

    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @param translations - Optional translations to search.
     * @returns A promise that resolves to the a value in the translations.
    */
    async getTranslation(locale: string, key: string, id: string = key, dictionaryName: string = this.dictionaryName, translations?: { local?: any, remote?: any }): Promise<any | null> {
        translations = translations || await this.getTranslations(locale, dictionaryName);
        if (translations.local) {
            const translation = getDictionaryEntry(id, translations.local);
            if (translation) return translation;
        }
        if (translations.remote) {
            if (translations.remote[id] && translations.remote[id].k === key) return translations.remote[id].t;
        }
        return null;
    }
   
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    async translate(params: any): Promise<string> {
        const cacheKey = JSON.stringify(params);
        if (this._translationCache.has(cacheKey)) {
            return this._translationCache.get(cacheKey);
        }
        const { content, targetLanguage, options }: { content: string, targetLanguage: string, options: Record<string, any> } = params;
        const dictionaryName: string = params.options?.dictionaryName || this.dictionaryName;
        const translationPromise = new Promise<string>((resolve, reject) => {
            this._queue.push({
                type: "string",
                data: {
                    content,
                    targetLanguage,
                    projectID: this.projectID,
                    metadata: { ...this.metadata, ...this.getMetadata(), ...options }
                },
                cache: (this._remoteDictionaryManager) ? this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
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
        const { children, targetLanguage, metadata }: { children: any, targetLanguage: string, metadata: Record<string, any> } = params;
        const dictionaryName: string = params.options?.dictionaryName || this.dictionaryName;
        const translationPromise = new Promise<any>((resolve, reject) => {
            this._queue.push({
                type: "react",
                data: {
                    children,
                    targetLanguage,
                    metadata: { ...this.metadata, ...this.getMetadata(), ...metadata }
                },
                cache: (this._remoteDictionaryManager) ? this._remoteDictionaryManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
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
            const bundlePromise = this.gt.translateBundle(batch);
            batch.forEach((item) => {
                if (this._remoteDictionaryManager && item.cache) this._remoteDictionaryManager.setTranslationRequested(item.data.targetLanguage, item.data.metadata.dictionaryName);
            })
            const results = await bundlePromise;
            batch.forEach((item, index) => {
                const result = results[index];
                if (!result) return item.reject('Translation failed.');
                if (result && typeof result === 'object') {
                    item.resolve(result.translation);
                    if (result.translation && result.language && result.reference && this._remoteDictionaryManager) {
                        this._remoteDictionaryManager.setDictionary(
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
            batch.forEach(item => item.reject(error));
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