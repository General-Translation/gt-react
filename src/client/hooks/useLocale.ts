'use client'

import { useGTContext } from "../ClientProvider";

/**
 * @returns {string} The user's current locale.
 */
export default function useLocale(): string {
    const { locale } = useGTContext();
    return locale;
}
