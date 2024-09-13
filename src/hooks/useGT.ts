'use client'

import React, { ReactNode, useCallback } from "react";
import useGTContext from "../provider/GTContext";

/**
 * Custom hook to provide a translation function using a given context.
 *
 * This hook allows for optional prefixing of translation keys with a provided `id`.
 *
 * @param {string} [id] - Optional prefix to prepend to the translation keys.
 * @returns {Function} A translation function that accepts a key string and returns the translated value.
 */
export default function useGT(id: string = ''): 
    (
        id: string, 
        options?: Record<string, any>,
        f?: Function
    ) => ReactNode 
{
    // Create a prefix for translation keys if an id is provided
    const getID = (suffix: string) => {
        if (id && suffix) return `${id}.${suffix}`;
        return id ? id : suffix;
    }

    // Get the translation context
    const { translate } = useGTContext(
        `useGT('${id}'): No context provided. You're trying to get the t() function on the client, which can only be done inside a <GTProvider>.`
    );

    // Return a translation function if available, otherwise return a no-op function
    return (id: string = '', options: {
        n?: number,
        [key: string]: any
    } = {}, f?: Function) => {
        const prefixedID = getID(id);
        const translation = translate(prefixedID, options, f);
        if (!translation) console.warn(`t('${id}') finding no translation for dictionary item ${prefixedID} !`)
        return translation;
    };
}