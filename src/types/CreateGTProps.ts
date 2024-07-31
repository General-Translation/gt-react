type CreateGTProps = {
    // Cloud integration
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    remoteSource?: boolean;
    // Locale info
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    // Rendering
    renderMethod?: string;
    // Dictionaries
    dictionaryName?: string;
    dictionary?: Record<string, any>
    translations?: Record<string, () => Promise<Record<string, any>>> | null;
    // Batching config
    maxConcurrentRequests?: number;
    batchInterval?: number; // ms
    // Other metadata
    getMetadata?: () => Record<string, any>
    [key: string]: any;
}

export default CreateGTProps;