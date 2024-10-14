import { primitives } from "gt-react/internal";
import getDefaultFromEnv from "../utils/getDefaultFromEnv";

export default {
    apiKey: getDefaultFromEnv('GT_API_KEY'),
    projectID: getDefaultFromEnv('GT_PROJECT_ID'),
    baseURL: 'https://prod.gtx.dev',
    cacheURL: primitives.defaultCacheURL,
    defaultLocale: primitives.libraryDefaultLocale,
    getLocale: () => primitives.libraryDefaultLocale,
    renderSettings: {
        fallbackToPrevious: true,
        method: "skeleton",
        timeout: null
    },
    dictionaryName: primitives.defaultDictionaryName,
    getMetadata: () => ({}),
    env: getDefaultFromEnv('NODE_ENV'), 
    _maxConcurrectRequests: 2,
    _batchInterval: 1000
} as const;