'use client';
import { useContext } from "react";
import { GTContext } from "../ClientProvider";
/**
 * @returns {string} The current locale or an empty string if not set.
 */
export default function useLocale() {
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`useLocale(): No context provided. useLocale() can only be used inside a GTProvider.`);
        return "";
    }
    return ctx.locale || "";
}
//# sourceMappingURL=useLocale.js.map