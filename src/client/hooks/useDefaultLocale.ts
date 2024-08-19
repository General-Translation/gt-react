'use client'

import { useGTContext } from "../ClientProvider";

/**
 * @returns {string} The default locale.
 */
export default function useDefaultLocale(): string {
    const { defaultLocale } = useGTContext();
    return defaultLocale;
}
