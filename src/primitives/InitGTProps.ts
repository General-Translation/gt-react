type InitGTProps = {
    // Request scoped filepath
    dictionary?: string;
    i18n?: string
    // Cloud integration
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    // Locale info
    locales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    // Rendering
    renderSettings?: {
        fallbackToPrevious: boolean,
        method: "skeleton" | "replace" | "hang" | "subtle",
        timeout: number | null
    }
    // Dictionaries
    dictionaryName?: string;
    // Other metadata
    getMetadata?: () => Record<string, any>
    // Batching config
    _maxConcurrentRequests?: number;
    _batchInterval?: number; // ms
    // Translation assistance
    description?: string
    // Other
    [key: string]: any;
}

export default InitGTProps;