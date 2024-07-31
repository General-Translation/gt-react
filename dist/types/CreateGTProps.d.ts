type CreateGTProps = {
    apiKey?: string;
    projectID?: string;
    baseURL?: string;
    cacheURL?: string;
    remoteSource?: boolean;
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
    renderMethod?: string;
    renderTimeout?: number | null;
    dictionaryName?: string;
    dictionary?: Record<string, any>;
    translations?: Record<string, () => Promise<Record<string, any>>>;
    maxConcurrentRequests?: number;
    batchInterval?: number;
    getMetadata?: () => Record<string, any>;
    [key: string]: any;
};
export default CreateGTProps;
//# sourceMappingURL=CreateGTProps.d.ts.map