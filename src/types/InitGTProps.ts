type InitGTProps = {
    // Cloud integration
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    remoteSource?: boolean;
    automaticTranslation?: boolean;
    // Locale info
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    // Rendering
    renderPrevious?: boolean,
    renderMethod?: string;
    renderTimeout?: number | null;
    // Dictionaries
    dictionaryName?: string;
    dictionary?: Record<string, any>;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    // Batching config
    maxConcurrentRequests?: number;
    batchInterval?: number; // ms
    // Other metadata
    getMetadata?: () => Record<string, any>
    [key: string]: any;
}

export default InitGTProps;