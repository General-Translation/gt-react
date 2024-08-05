'use client';
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
export default function useGT(id) {
    // Create a prefix for translation keys if an id is provided
    const prefix = useMemo(() => {
        return id ? `${id}.` : '';
    }, [id]);
    // Get the translation context
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }
    // Return a translation function if available, otherwise return a no-op function
    if (ctx === null || ctx === void 0 ? void 0 : ctx.translate) {
        return (id) => {
            const translation = ctx.translate(`${prefix}${id}`);
            if (!translation)
                console.warn(`t('${id}') finding no translation for dictionary item ${prefix}${id} !`);
            return translation;
        };
    }
    return () => { };
}
//# sourceMappingURL=useGT.js.map