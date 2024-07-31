'use client'
import React, { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';

interface I18NResolverProps {
    children: ReactNode | Promise<ReactNode>;
    fallback: ReactNode;
}

export default function I18NResolver({ children, fallback }: I18NResolverProps): JSX.Element {
    
    const [resolvedChildren, setResolvedChildren] = useState<any>(fallback);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let abortController = new AbortController();

        const resolveChildren = async () => {
            try {
                if (children instanceof Promise) {
                    const resolved = await Promise.race([
                        children,
                        new Promise((_, reject) => {
                            abortController.signal.addEventListener('abort', () => 
                                reject(new Error('Connection closed'))
                            );
                        })
                    ]);
                    if (isMounted) {
                        setResolvedChildren(resolved);
                    }
                } else {
                    setResolvedChildren(children);
                }
            } catch (error) {
                console.error('Error resolving children:', error);
                if (isMounted) {
                    setHasError(true);
                }
            }
        };

        resolveChildren();

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [children]);

    if (hasError) {
        return <>{fallback}</>;
    }

    return (
        <Suspense fallback={fallback}>
            {resolvedChildren}
        </Suspense>
    );
}