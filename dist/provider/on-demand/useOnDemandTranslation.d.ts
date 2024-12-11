type TranslationRequest = {
    source: any;
    targetLocale: string;
    metadata: Record<string, any>;
};
/**
 * Hook to fetch translations on-demand with batching and concurrency control.
 * @param {object} params - Hook parameters.
 * @param {string} [params.baseUrl] - Base URL for the API.
 * @param {string} [params.devApiKey] - Development API key.
 * @param {string} [params.projectId] - Project ID for translations.
 * @param {string} [params.defaultLocale] - Default locale.
 * @param {number} params.maxConcurrentRequests - Max number of concurrent fetch requests.
 * @param {number} params.batchInterval - Interval between processing batches.
 * @param {Record<string, any>} [params.metadata] - Additional metadata.
 * @returns {{ translateJsx: (request: TranslationRequest) => Promise<any> }}
 */
export default function useOnDemandTranslation({ baseUrl, devApiKey, projectId, defaultLocale, maxConcurrentRequests, batchInterval, ...metadata }: {
    baseUrl?: string;
    devApiKey?: string;
    projectId?: string;
    defaultLocale?: string;
    maxConcurrentRequests?: number;
    batchInterval?: number;
    [key: string]: any;
}): {
    translateJsx: (request: TranslationRequest) => Promise<string>;
};
export {};
//# sourceMappingURL=useOnDemandTranslation.d.ts.map