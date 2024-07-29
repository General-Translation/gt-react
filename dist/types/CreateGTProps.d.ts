type CreateGTProps = {
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    renderMethod?: string;
    dictionaryName?: string;
    dictionary?: Record<string, any>;
    maxConcurrentRequests?: number;
    batchInterval?: number;
    getMetadata?: () => Record<string, any>;
    [key: string]: any;
};
export default CreateGTProps;
//# sourceMappingURL=CreateGTProps.d.ts.map