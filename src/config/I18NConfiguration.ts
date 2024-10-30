import GT, { requiresTranslation } from "generaltranslation";
import remoteTranslationsManager, { RemoteTranslationsManager } from "./RemoteTranslationsManager";

type I18NConfigurationParams = {
    apiKey: string;
    projectID: string;
    cacheURL: string;
    baseURL: string,
    defaultLocale: string, 
    locales?: string[],
    renderSettings: {
        method: "skeleton" | "replace" | "hang" | "subtle",
        timeout: number | null
    }
    dictionaryName: string;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    maxConcurrentRequests: number;
    batchInterval: number;
    [key: string]: any;
}

export default class I18NConfiguration {
    // Cloud integration
    baseURL: string;
    projectID: string;
    // Locale info
    defaultLocale: string;
    locales: string[] | undefined;
    // Rendering
    renderSettings: {
        method: "skeleton" | "replace" | "hang" | "subtle",
        timeout: number | null
    }
    // Dictionaries
    dictionaryName: string;
    private _remoteTranslationsManager: RemoteTranslationsManager | undefined;
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
        defaultLocale,
        locales,
        // Render method
        renderSettings,
        // Dictionaries
        dictionary, dictionaryName,
        // Batching config
        maxConcurrentRequests, batchInterval,
        // Other metadata
        ...metadata
    }: I18NConfigurationParams) {
        // Cloud integration
        this.projectID = projectID;
        this.baseURL = baseURL;
        // Locales
        this.defaultLocale = defaultLocale;
        this.locales = locales;
        // Render method
        this.renderSettings = renderSettings;
        // Dictionaries
        this.dictionaryName = dictionaryName;
        // GT
        this.gt = new GT({ projectID, apiKey, defaultLanguage: defaultLocale, baseURL });
        // Other metadata
        this.metadata = { 
            projectID: this.projectID, 
            defaultLanguage: this.defaultLocale, 
            dictionaryName,
            ...(this.renderSettings.timeout && { timeout: this.renderSettings.timeout - batchInterval }),
            ...metadata
        };
        // Dictionary managers
        if (cacheURL && projectID) {
            this._remoteTranslationsManager = remoteTranslationsManager;
            this._remoteTranslationsManager.setConfig({
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
    getLocales(): string[] | undefined {
        return this.locales;
    }

    /**
     * Gets the name of the current dictionary
     * @returns {string} A BCP-47 language tag
    */
    getDictionaryName(): string {
        return this.dictionaryName;
    }

    /**
     * @returns A boolean indicating whether automatic translation is enabled or disabled for this config
    */
    translationEnabled(): boolean {
        return (this.baseURL && this.projectID) ? true : false;
    }

    /**
     * Get the rendering instructions
     * @returns An object containing the current method and timeout. 
     * As of 7/31/24: method is "skeleton", "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
    */
    getRenderSettings(): { 
        method: "skeleton" | "replace" | "hang" | "subtle", 
        timeout: number | null
    } {
        return this.renderSettings;
    }

    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    requiresTranslation(locale: string): boolean {
        return requiresTranslation(this.defaultLocale, locale, this.locales);
    }

    /**
     * Get the translation dictionaries for this user's locale, if they exist
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    async getTranslations(locale: string, dictionaryName: string = this.dictionaryName): Promise<Record<string, any>> {
        return (await this._remoteTranslationsManager?.getTranslations(locale, dictionaryName)) || {};
    }
   
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    
    async translate(params: { content: string | (string | { key: string, variable?: string })[], targetLanguage: string, options: Record<string, any> }): Promise<string> {
        const cacheKey = constructCacheKey(params.targetLanguage, params.options);
        if (this._translationCache.has(cacheKey)) {
            return this._translationCache.get(cacheKey);
        }
        const { content, targetLanguage, options } = params;
        const dictionaryName: string = params.options?.dictionaryName || this.dictionaryName;
        const translationPromise = new Promise<string>((resolve, reject) => {
            this._queue.push({
                type: "string",
                data: {
                    content,
                    targetLanguage,
                    projectID: this.projectID,
                    metadata: { ...this.metadata, ...options }
                },
                revalidate: (this._remoteTranslationsManager) ? this._remoteTranslationsManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
                resolve,
                reject
            });
        });
        this._translationCache.set(cacheKey, translationPromise);
        return translationPromise.catch((error) => {
            this._translationCache.delete(cacheKey)
            throw new Error(error);
        });
    }
   
    /**
     * Translate the children components
     * @param params - Parameters for translation
     * @returns A promise that resolves when translation is complete
    */
    async translateChildren(params: { children: any, targetLanguage: string, metadata: Record<string, any> }): Promise<any> {
        const cacheKey = constructCacheKey(params.targetLanguage, params.metadata);
        if (this._translationCache.has(cacheKey)) {
            return this._translationCache.get(cacheKey);
        }
        const { children, targetLanguage, metadata } = params;
        const dictionaryName: string = metadata?.dictionaryName || this.dictionaryName;
        const translationPromise = new Promise<any>((resolve, reject) => {
            this._queue.push({
                type: "react",
                data: {
                    children,
                    targetLanguage,
                    metadata: { ...this.metadata, ...metadata }
                },
                revalidate: (this._remoteTranslationsManager) ? this._remoteTranslationsManager.getTranslationRequested(targetLanguage, dictionaryName) : false,
                resolve,
                reject
            });
        });
        this._translationCache.set(cacheKey, translationPromise);
        return translationPromise;
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
                if (this._remoteTranslationsManager && item.revalidate) this._remoteTranslationsManager.setTranslationRequested(item.data.targetLanguage, item.data.metadata.dictionaryName);
            })
            const results = await bundlePromise;
            batch.forEach((item, index) => {
                const result = results[index];
                if (!result) return item.reject('Translation failed.');
                if (result && typeof result === 'object') {
                    item.resolve(result.translation);
                    if (result.translation && result.language && result.reference && this._remoteTranslationsManager) {
                        this._remoteTranslationsManager.setTranslations(
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

// Constructs the unique identification key for the map which is the in-memory same-render-cycle cache
const constructCacheKey = (targetLanguage: string, metadata: Record<string, any>) => {
    console.log(`${targetLanguage}-${metadata.hash}`);
    return `${targetLanguage}-${metadata.hash}`;
}