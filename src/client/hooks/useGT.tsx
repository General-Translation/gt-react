'use client'

import { useMemo } from "react";
import { useGTContext } from "../ClientProvider";
import ClientValue from "../value/ClientValue";
import ClientPlural from "../plural/ClientPlural";

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
    let translate;
    try {
        ({ translate } = useGTContext());
    } catch {
        throw new Error(`t('${id}'): No context provided. useGT() can only be used inside a GTProvider.`);
    }

    // Return a translation function if available, otherwise return a no-op function
    return (id: string, options?: {
        n?: number,
        values?: Record<string, any>
        [key: string]: any
    }) => {

        const translation = translate(`${prefix}${id}`);

        // If a plural or value is required
        if (options) {
            const { 
                n, values, 
                ranges, zero, one, two, few, many, other, singular, dual, plural 
            } = options;
            if (typeof n === 'number') {
                const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
                if (values) {
                    // Plural + Value
                    return (
                        <ClientValue values={values}>
                            <ClientPlural id={id} {...innerProps}>
                                {translation}
                            </ClientPlural>
                        </ClientValue>
                    );
                } else {
                    // Plural only
                    return (
                        <ClientPlural id={id} {...innerProps}>
                            {translation}
                        </ClientPlural>
                    )
                }
            } else if (values) {
                // Value only
                return (
                    <ClientValue id={id} values={values}>
                        {translation}
                    </ClientValue>
                )
            }
        }

        if (!translation) console.warn(`t('${id}') finding no translation for dictionary item ${prefix}${id} !`)

        return translation;
    }
}