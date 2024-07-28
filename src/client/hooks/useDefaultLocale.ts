'use client'

import { useContext } from "react";
import { GTContext } from "../ClientProvider";

/**
 * @returns {string} The default locale or an empty string if not set.
 */
export default function useDefaultLocale(): string {
    const ctx = useContext(GTContext);
    if (ctx?.defaultLocale) {
        return ctx.defaultLocale;
    }
    return "";
}
