'use client'

import React, { ReactNode, useState, useEffect } from 'react';
import { Suspense } from 'react';

interface I18NResolverProps {
    children: ReactNode | Promise<ReactNode>;
    fallback: ReactNode;
}

/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 * 
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function SkeletonResolver({ children, fallback }: I18NResolverProps): JSX.Element {
    
    const [resolvedChildren, setResolvedChildren] = useState<ReactNode>(null);
    
    const [hasError, setHasError] = useState(false);
    
    useEffect(() => {

        let isMounted = true;

        const resolveChildren = async () => {
            try {
                const resolved = await Promise.resolve(children);
                if (isMounted) {
                    setResolvedChildren(resolved);
                }
            } catch (error) {
                console.error(error)
                if (isMounted) {
                    setHasError(true);
                }
            }
        };

        if (children instanceof Promise) {
            resolveChildren();
        } else {
            setResolvedChildren(children);
        }

        return () => {
            isMounted = false;
        };

    }, [children]);

    if (hasError) {
        return <>{fallback}</>;
    }

    return (
        <Suspense fallback={null}>
            {resolvedChildren}
        </Suspense>
    );
}