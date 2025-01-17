import { useCallback, useEffect, useRef, useState } from "react";
import { dynamicTranslationError } from "../../errors/createErrors";

export default function useDynamicTranslation({
    targetLocale, 
    projectId, devApiKey,
    runtimeUrl, defaultLocale,
    setTranslations,
    ...metadata
}: {
    targetLocale: string
    projectId?: string,
    defaultLocale?: string,
    devApiKey?: string,
    runtimeUrl?: string,
    setTranslations: React.Dispatch<React.SetStateAction<any>>
    [key: string]: any
}): {
    translationEnabled: boolean
    translateContent: (params: { source: any, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any> }) => void,
    translateChildren: (params: { source: any, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any> }) => void,
} {

    metadata = { ...metadata, projectId, sourceLocale: defaultLocale };

    const translationEnabled = !!(runtimeUrl && projectId);
    if (!translationEnabled) return { translationEnabled, translateContent: () => {}, translateChildren: () => {} };

    // Queue to store requested keys between renders.
    const requestQueueRef = useRef<Map<string, any>>(new Map());
    // Trigger a fetch when keys have been added.
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const translateContent = useCallback((params: {
        source: any, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any>
    }) => {
        const id = params.metadata.id ? `${params.metadata.id}-` : '';
        const key = `${id}${params.metadata.hash}-${params.targetLocale}`;
        requestQueueRef.current.set(key, { type: 'content', source: params.source, metadata: params.metadata });
        setFetchTrigger((n) => n + 1);
    }, []);

    /**
     * Call this from <T> components to request a translation key.
     * Keys are batched and fetched in the next effect cycle.
     */
    const translateChildren = useCallback((params: {
        source: any, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any>
    }) => {
        const id = params.metadata.id ? `${params.metadata.id}-` : '';
        const key = `${id}${params.metadata.hash}-${params.targetLocale}`;
        requestQueueRef.current.set(key, { type: 'jsx', source: params.source, metadata: params.metadata });
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
                const response = await fetch(`${runtimeUrl}/v1/runtime/${projectId}/client`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      ...(devApiKey && { 'x-gt-dev-api-key': devApiKey })
                    },
                    body: JSON.stringify({
                      requests,
                      targetLocale,
                      metadata
                    }),
                });
                if (!response.ok) {
                    throw new Error(await response.text())
                }

                const results = await response.json() as any[];
                if (!isCancelled) {
                    const newTranslations: Record<string, any> = {};

                    results.forEach((result, index) => {
                        const request = requests[index];
                        if ('translation' in result && result.translation && result.reference) { // translation success
                            const { translation, reference: { id, key } } = result;
                            // check for mismatching ids or hashes
                            if (id !== request.metadata.id || key !== request.metadata.hash) {
                                if (!request.metadata.id) {
                                    console.warn(`Mismatching hashes! Expected hash: ${request.metadata.hash}, but got hash: ${key}. We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs`);
                                } else {
                                    console.warn(`Mismatching ids or hashes! Expected id: ${request.metadata.id}, hash: ${request.metadata.hash}, but got id: ${id}, hash: ${key}. We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs`);
                                }
                            }
                            newTranslations[id || request.metadata.hash] = { [request.metadata.hash]: translation };
                        } else if ('error' in result && result.error && (result as any).code) { // translation error
                            newTranslations[request.metadata.id || request.metadata.hash] = {
                                error: result.error || "An error occurred.",
                                code: (result as any).code || 500
                            };
                            // error message
                            if (!request.metadata.id) {
                                console.error(`Translation failed for hash: ${request.metadata.hash} `, result);
                            } else {
                                console.error(`Translation failed for id: ${request.metadata.id}, hash: ${request.metadata.hash} `, result);
                            }
                        } else {    // unknown error
                            // id defaults to hash if none provided
                            newTranslations[request.metadata.id || request.metadata.hash] = {
                                error: "An error occurred.",
                                code: 500
                            }
                        }
                    });

                    // update our translations
                    setTranslations((prev: any) => {return { ...(prev || {}), ...newTranslations }});
                }
            } catch (error) {
                console.error(dynamicTranslationError, error);
                setTranslations((prev: any) => {
                    let merged: Record<string, any> = { ...(prev || {}) };
                    requests.forEach((request) => {
                        // id defaults to hash if none provided
                        merged[request.metadata.id || request.metadata.hash] = {
                            error: "An error occurred.",
                            code: 500
                        }
                    });
                    return merged;
                });
            } finally {
                requestQueueRef.current.clear();
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [fetchTrigger, setTranslations]);

    return { translateContent, translateChildren, translationEnabled };
}