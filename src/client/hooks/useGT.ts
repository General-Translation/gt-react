'use client'

import { useContext, useMemo } from "react";
import { GTContext } from "../ClientProvider";

/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
export default function useGT(id?: string): Function {
    // Create a prefix for translation keys if an id is provided
    const prefix = useMemo(() => {
        return id ? `${id}.` : ''
    }, [id]);

    // Get the translation context
    const ctx = useContext(GTContext);

    // Return a translation function if available, otherwise return a no-op function
    if (ctx?.translate) {
        return (id: string) => ctx.translate(`${prefix}${id}`);
    }
    return () => {};
}
