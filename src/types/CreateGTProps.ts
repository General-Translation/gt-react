type CreateGTProps = {
    // Cloud integration
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    // Locale info
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    // Rendering
    renderMethod?: string;
    // Dictionaries
    dictionaryName?: string;
    dictionary?: Record<string, any>
    // Batching config
    maxConcurrentRequests?: number;
    batchInterval?: number; // ms
    // Other metadata
    [key: string]: any;
}

export default CreateGTProps;