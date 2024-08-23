'use client'

import React, { ReactNode, useState, useEffect } from 'react';

/**
 * Resolver component to handle async resolution of children.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The children to resolve.
 * @param {ReactNode} props.fallback - The fallback to display on error.
 * @returns {JSX.Element} The resolved children or fallback.
 */
export default function ClientResolver({
    promise, fallback
}: { promise: Promise<any>, fallback: ReactNode }): JSX.Element {
    const [resolved, setResolved] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        const resolveChildren = async () => {
            try {
                const result = await promise;
                setResolved(result);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };
        resolveChildren();
    }, [promise]);
    if (error) {
        return <>{fallback}</>;
    }
    return <>{resolved}</>;
}