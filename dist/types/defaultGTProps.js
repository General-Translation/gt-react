import getDefaultFromEnv from "../config/local/getDefaultFromEnv";
const defaultGTProps = {
    apiKey: getDefaultFromEnv('GT_API_KEY'),
    projectID: getDefaultFromEnv('GT_PROJECT_ID'),
    cacheURL: "https://cache.gtx.dev",
    baseURL: "https://prod.gtx.dev",
    remoteSource: true,
    automaticTranslation: true,
    // Locale info
    defaultLocale: 'en',
    getLocale: () => { return 'en '; },
    // Rendering
    renderPrevious: true,
    renderMethod: "replace", // "skeleton", "hang", "subtle"
    renderTimeout: 12500,
    // Dictionaries
    dictionaryName: "default",
    dictionary: {},
    // Batching config
    maxConcurrentRequests: 2,
    batchInterval: 1000,
    // Other metadata
    getMetadata: () => { return {}; }
};
export default defaultGTProps;
//# sourceMappingURL=defaultGTProps.js.map