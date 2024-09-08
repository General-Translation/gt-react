import GT from "generaltranslation";
type I18NConfigurationParams = {
    apiKey: string;
    projectID: string;
    cacheURL: string;
    baseURL: string;
    remoteSource: boolean;
    automaticTranslation: boolean;
    getLocale: () => string;
    defaultLocale: string;
    approvedLocales?: string[];
    renderPrevious: boolean;
    renderMethod: string;
    renderTimeout: number | null;
    dictionary: Record<string, any>;
    dictionaryName: string;
    saveByDefault?: boolean;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    maxConcurrentRequests: number;
    batchInterval: number;
    getMetadata: () => Record<string, any>;
    [key: string]: any;
};
export default class I18NConfiguration {
    projectID: string;
    remoteSource: boolean;
    automaticTranslation: boolean;
    getLocale: () => string;
    defaultLocale: string;
    approvedLocales: string[] | undefined;
    renderPrevious: boolean;
    renderMethod: string;
    renderTimeout: number | null;
    dictionaryName: string;
    dictionary: Record<string, any>;
    saveByDefault?: boolean;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    private _localDictionaryManager;
    private _remoteDictionaryManager;
    gt: GT;
    getMetadata: () => Record<string, any>;
    metadata: Record<string, any>;
    maxConcurrentRequests: number;
    batchInterval: number;
    private _queue;
    private _activeRequests;
    private _translationCache;
    constructor({ apiKey, projectID, baseURL, cacheURL, remoteSource, automaticTranslation, getLocale, defaultLocale, approvedLocales, renderPrevious, renderMethod, renderTimeout, dictionary, dictionaryName, saveByDefault, translations, maxConcurrentRequests, batchInterval, getMetadata, ...metadata }: I18NConfigurationParams);
    /**
     * Gets the application's default locale
     * @returns {string} A BCP-47 language tag
    */
    getDefaultLocale(): string;
    /**
     * Gets the list of approved locales for this app
     * @returns {string[] | undefined} A list of BCP-47 language tags, or undefined if none were provided
    */
    getApprovedLocales(): string[] | undefined;
    /**
     * Get dictionary
     * @returns The entire dictionary, or an empty object if none found
    */
    getDictionary(): Record<string, any>;
    /**
     * Gets the name of the current dictionary
     * @returns {string} A BCP-47 language tag
    */
    getDictionaryName(): string;
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    getDictionaryEntry(id: string): any;
    /**
     * Get an entry from the dictionary
     * @returns An entry from the dictionary determined by id
    */
    automaticTranslationEnabled(): boolean;
    /**
     * Get the rendering instructions
     * @returns An object containing the current method and timeout.
     * As of 7/31/24: method is "skeleton", "replace", "hang", "subtle".
     * Timeout is a number or null, representing no assigned timeout.
     * renderPrevious determines whether a non-matching previous entry should be rendered while the new translation loads.
    */
    getRenderSettings(): {
        method: string;
        timeout: number | null;
        renderPrevious: boolean;
    };
    /**
     * Check if translation is required based on the user's locale
     * @param locale - The user's locale
     * @returns True if translation is required, otherwise false
     */
    translationRequired(locale: string): boolean;
    /**
     * Returns a boolean determining whether or not a translation should be saved remotely
     * Undefined if not set
     * @returns {string} A BCP-47 language tag
    */
    shouldSave(): boolean | undefined;
    /**
     * Get the translation dictionaries for this user's locale, if they exist
     * @param locale - The language set by the user
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @returns A promise that resolves to the translations.
    */
    getTranslations(locale: string, dictionaryName?: string): Promise<{
        local?: any;
        remote?: any;
    }>;
    /**
     * Get the entry in the translation dictionary for the user's locale, if it exists
     * @param locale - The user's locale
     * @param key - Key in the dictionary. For strings, the original language version of that string. For React children, a hash.
     * @param dictionaryName - User-defined dictionary name, for distinguishing between multiple translation dictionaries for a single language.
     * @param translations - Optional translations to search.
     * @returns A promise that resolves to the a value in the translations.
    */
    getTranslation(locale: string, key: string, id?: string, dictionaryName?: string, translations?: {
        local?: any;
        remote?: any;
    }): Promise<any | null>;
    /**
     * Translate content into language
     * @param params - Parameters for translation
     * @returns Translated string
     */
    translate(params: any): Promise<string>;
    /**
     * Translate the children components
     * @param params - Parameters for translation
     * @returns A promise that resolves when translation is complete
    */
    translateChildren(params: any): Promise<any>;
    /**
     * Send a batch request for React translation
     * @param batch - The batch of requests to be sent
     */
    private _sendBatchRequest;
    /**
     * Start the batching process with a set interval
    */
    private _startBatching;
}
export {};
//# sourceMappingURL=I18NConfiguration.d.ts.map