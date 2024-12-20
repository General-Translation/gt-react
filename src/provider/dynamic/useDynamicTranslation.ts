import GT from "generaltranslation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dynamicTranslationError } from "../../errors/createErrors";
import { defaultBaseUrl } from "generaltranslation/internal";

export default function useDynamicTranslation({
    projectId, devApiKey,
    baseUrl, defaultLocale,
    setTranslations,
    ...metadata
}: {
    projectId?: string,
    defaultLocale?: string,
    devApiKey?: string,
    baseUrl?: string,
    setTranslations: React.Dispatch<React.SetStateAction<any>>
    [key: string]: any
}) {

    const gt = useMemo(() => new GT({ devApiKey, projectId, baseUrl, defaultLocale: defaultLocale }), [ devApiKey, projectId, baseUrl, metadata.defaultLocale ])
    metadata = { ...metadata, projectId, defaultLocale  };

    const translationEnabled = (
        baseUrl &&
        projectId &&
        (baseUrl === defaultBaseUrl ? gt.apiKey : true)
        ? true
        : false
    );
    if (!translationEnabled) return { translationEnabled };

    // Queue to store requested keys between renders.
    const requestQueueRef = useRef<Map<string, any>>(new Map());
    // Trigger a fetch when keys have been added.
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const translateContent = useCallback((params: {
        source: any, targetLocale: string, metadata: { hash: string } & Record<string, any>
    }) => {
        const key = `${params.metadata.hash}-${params.targetLocale}`;
        const data = { ...params, metadata: { ...metadata, ...params.metadata } };
        requestQueueRef.current.set(key, { type: 'content', data });
        setFetchTrigger((n) => n + 1);
    }, []);

    /**
     * Call this from <T> components to request a translation key.
     * Keys are batched and fetched in the next effect cycle.
     */
    const translateChildren = useCallback((params: {
        source: any, targetLocale: string, metadata: { hash: string } & Record<string, any>
    }) => {
        const key = `${params.metadata.hash}-${params.targetLocale}`;
        const data = { ...params, metadata: { ...metadata, ...params.metadata } };
        requestQueueRef.current.set(key, { type: 'jsx', data });
        setFetchTrigger((n) => n + 1);
    }, []);

    useEffect(() => {
        if (requestQueueRef.current.size === 0) {
            return;
        }
        let isCancelled = false;
        (async () => {
            const requests = Array.from(requestQueueRef.current.values());
            try {
                const results = await gt.translateBatchFromClient(requests);
                if (!isCancelled) {
                    setTranslations((prev: any) => {
                        let merged: Record<string, any> = { ...(prev || {}) };
                        results.forEach((result, index) => {
                            const request = requests[index];
                            if ('translation' in result && result.translation && result.reference) {
                                const { translation, reference: { id, key } } = result;
                                merged[id] = { [key]: translation };
                            } else if ('error' in result && result.error && result.code) {
                                merged[request.data.metadata.id || request.data.metadata.hash] = {
                                    error: result.error,
                                    code: result.code
                                }
                                console.error(`Translation failed${result?.reference?.id ? ` for id: ${result.reference.id}` : '' }`, result.code, result.error);
                            } else {
                                // id defaults to hash if none provided
                                merged[request.data.metadata.id || request.data.metadata.hash] = {
                                    error: "An error occurred.",
                                    code: 500
                                }
                            }
                        });
                        return merged;
                    });
                }
            } catch (error) {
                console.error(dynamicTranslationError, error);
            } finally {
                requestQueueRef.current.clear();
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [gt, fetchTrigger, setTranslations]);

    return { translateContent, translateChildren, translationEnabled };
}