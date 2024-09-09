import GeneralTranslation from "./types/GeneralTranslationInterface";
import InitGTProps from "./types/InitGTProps";
import Variables from './types/Variables';
export declare function initGT({ apiKey, projectID, cacheURL, baseURL, remoteSource, automaticTranslation, approvedLocales, defaultLocale, getLocale, renderPrevious, renderMethod, // "replace", "hang", "subtle"
renderTimeout, dictionaryName, dictionary, translations, maxConcurrentRequests, batchInterval, getMetadata, ...metadata }?: InitGTProps): GeneralTranslation;
export declare function initVariables({ approvedLocales, defaultLocale, getLocale }?: {
    approvedLocales?: string[];
    defaultLocale?: string;
    getLocale?: () => string;
}): Variables;
//# sourceMappingURL=server-index.d.ts.map