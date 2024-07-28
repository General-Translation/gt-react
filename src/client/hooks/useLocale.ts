'use client'

import { useContext } from "react";
import { GTContext } from "../ClientProvider";

/**
 * @returns {string} The current locale or an empty string if not set.
 */
export default function useLocale(): string {
    const ctx = useContext(GTContext);
    if (ctx?.locale) {
        return ctx.locale;
    }
    return "";
}
