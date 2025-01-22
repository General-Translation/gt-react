import { useCallback, useEffect, useRef, useState } from "react";
import { createMismatchingHashWarning, createMismatchingIdHashWarning, dynamicTranslationError, createGenericRuntimeTranslationError } from "../../messages/createMessages";
import { TranslateChildrenCallback, TranslateContentCallback, TranslationsObject } from "../../types/types";
import { Content } from "generaltranslation/internal";

export default function useRuntimeTranslation({
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
    translateContent: TranslateContentCallback,
    translateChildren: TranslateChildrenCallback,
} {

    metadata = { ...metadata, projectId, sourceLocale: defaultLocale };

    const translationEnabled = !!(runtimeUrl && projectId);
    if (!translationEnabled) return { 
        translationEnabled, 
        translateContent: () => Promise.reject(new Error('translateContent() failed because translation is disabled')), 
        translateChildren: () => Promise.reject(new Error('translateChildren() failed because translation is disabled')) 
    };

    // Queue to store requested keys between renders.
    type TranslationRequestQueueItem = {
        type: 'content' | 'jsx',
        source: Content | any,
        metadata: { hash: string, context?: string } & Record<string, any>,
        resolve: any,
        reject: any
    }
    const requestQueueRef = useRef<Map<string, TranslationRequestQueueItem>>(new Map());
    // Trigger a fetch when keys have been added.
    const [fetchTrigger, setFetchTrigger] = useState(0);

    const translateContent = useCallback((params: {
        source: Content, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any>
    }): Promise<void>  => {
        const id = params.metadata.id ? `${params.metadata.id}-` : '';
        const key = `${id}-${params.metadata.hash}-${params.targetLocale}`;
        setFetchTrigger((n) => n + 1);
        // promise for hooking into the translation request request to know when complete
        return new Promise<void>((resolve, reject) => {
            requestQueueRef.current.set(key, { type: 'content', source: params.source, metadata: params.metadata, resolve, reject });
        });
    }, []);

    /**
     * Call this from <T> components to request a translation key.
     * Keys are batched and fetched in the next effect cycle.
     */
    const translateChildren = useCallback((params: {
        source: any, targetLocale: string, metadata: { hash: string, context?: string } & Record<string, any>
    }): Promise<void> => {
        const id = params.metadata.id ? `${params.metadata.id}-` : '';
        const key = `${id}-${params.metadata.hash}-${params.targetLocale}`;
        setFetchTrigger((n) => n + 1);
        // promise for hooking into the translation request to know when complete
        return new Promise<void>((resolve, reject) => {
            requestQueueRef.current.set(key, { type: 'jsx', source: params.source, metadata: params.metadata, resolve, reject });
        });
    }, []);
    
    useEffect(() => {
        if (requestQueueRef.current.size === 0) {
            return;
        }
        let isCancelled = false;
        (async () => {
            const requests = Array.from(requestQueueRef.current.values());
            const newTranslations: TranslationsObject = {};
            try {
                // ----- TRANSLATION LOADING ----- //
                const loadingTranslations: TranslationsObject = requests.reduce((acc: TranslationsObject, request) => {
                    // loading state for jsx, render loading behavior
                    const id = request.metadata.id || request.metadata.hash;
                    acc[id] = { [request.metadata.hash]: { state: 'loading' } };
                    return acc;
                }, {});
                setTranslations((prev: any) => {return { ...(prev || {}), ...loadingTranslations }});

                // ----- RUNTIME TRANSLATION ----- // 
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

                // ----- PARSE RESPONSE ----- // 
                const results = await response.json() as any[];
                if (!isCancelled) { // don't send another req if one is already in flight

                    // process each result
                    results.forEach((result, index) => {
                        const request = requests[index];

                        // translation received
                        if ('translation' in result && result.translation && result.reference) {
                            const { translation, reference: { id, key: hash } } = result;
                            // check for mismatching ids or hashes
                            if (id !== request.metadata.id || hash !== request.metadata.hash) {
                                if (!request.metadata.id) {
                                    console.warn(createMismatchingHashWarning(request.metadata.hash, hash));
                                } else {
                                    console.warn(createMismatchingIdHashWarning(request.metadata.id, request.metadata.hash, id, hash));
                                }
                            }
                            // set translation
                            newTranslations[request.metadata.id || request.metadata.hash] = { // id defaults to hash if none provided
                                [request.metadata.hash]: {
                                    state: 'success',
                                    entry: translation
                                }
                            };
                            return;
                        }

                        // translation failure
                        if (result.error !== undefined && result.error !== null && result.code !== undefined && result.code !== null) { // 0 and '' are falsey
                            // log error message
                            console.error(createGenericRuntimeTranslationError(request.metadata.id, request.metadata.hash), result.error);
                            // set error in translation object
                            newTranslations[request.metadata.id || request.metadata.hash] = {
                                [request.metadata.hash]: {
                                    state: 'error',
                                    error: result.error,
                                    code: result.code
                                }
                            };
                            return;
                        }
                        
                        // unknown error
                        console.error(createGenericRuntimeTranslationError(request.metadata.id, request.metadata.hash), result);
                        newTranslations[request.metadata.id || request.metadata.hash] = {
                            [request.metadata.hash]: {
                                state: 'error',
                                error: "An error occurred.",
                                code: 500
                            }
                        }
                    });
                }
            } catch (error) {
                // log error
                console.error(dynamicTranslationError, error);

                // add error message to all translations from this request
                requests.forEach((request) => {
                    // id defaults to hash if none provided
                    newTranslations[request.metadata.id || request.metadata.hash] = {
                        [request.metadata.hash]: {
                            state: 'error',
                            error: "An error occurred.",
                            code: 500
                        }
                    }
                });

            } finally {
                // update our translations
                setTranslations((prev: any) => {return { ...(prev || {}), ...newTranslations }});

                // resolve all promises
                requests.forEach((request) => request.resolve());

                // clear the queue to avoid duplicate requests
                requestQueueRef.current.clear();
            }
        })();
        return () => {
            isCancelled = true;
        };
    }, [fetchTrigger, setTranslations]);

    return { translateContent, translateChildren, translationEnabled };
}