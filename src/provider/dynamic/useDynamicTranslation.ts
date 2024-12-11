import GT from "generaltranslation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dynamicTranslationError } from "../../errors/createErrors";

export default function useDynamicTranslation({
    projectId, devApiKey,
    baseUrl,
    setTranslations,
    ...metadata
}: {
    projectId?: string,
    defaultLocale?: string,
    devApiKey?: string,
    baseUrl?: string,
    setTranslations: React.Dispatch<React.SetStateAction<any>>
}) {

    const gt = useMemo(() => new GT({ devApiKey, projectId, baseUrl, defaultLocale: metadata.defaultLocale }), [ devApiKey, projectId, baseUrl, metadata.defaultLocale ])

    // Queue to store requested keys between renders.
    const requestQueueRef = useRef<Set<any>>(new Set());
    // Trigger a fetch when keys have been added.
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const translateContent = useCallback((params: {
        source: any, targetLocale: string, metadata: Record<string, any>
    }) => {
        requestQueueRef.current.add({ type: 'content', data: { ...params, metadata: { ...metadata, ...params.metadata } } });
        setFetchTrigger((n) => n + 1);
    }, []);

    /**
     * Call this from <T> components to request a translation key.
     * Keys are batched and fetched in the next effect cycle.
     */
    const translateChildren = useCallback((params: {
        source: any, targetLocale: string, metadata: Record<string, any>
    }) => {
        requestQueueRef.current.add({ type: 'jsx', data: { ...params, metadata: { ...metadata, ...params.metadata } } });
        setFetchTrigger((n) => n + 1);
    }, []);

    useEffect(() => {
        if (requestQueueRef.current.size === 0) {
            return;
        }
        let isCancelled = false;
        (async () => {
            const requests = Array.from(requestQueueRef.current);
            requestQueueRef.current.clear();
            try {
                const results = await gt.translateBatchFromClient(requests);
                if (!isCancelled) {
                    setTranslations((prev: any) => {
                        const merged = { ...(prev || {}) };
                        results.forEach(result => {
                            const { translation, reference } = result;
                            if (reference && translation) {
                                merged[reference.id] = { k: reference.key, t: translation }
                            }
                        })
                        return merged;
                    });
                }
            } catch (error) {
                console.error(dynamicTranslationError, error);
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [gt, fetchTrigger, setTranslations]);

    return { translateContent, translateChildren };
}