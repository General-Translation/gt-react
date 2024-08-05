'use client';
import { useContext } from "react";
import { GTContext } from "../ClientProvider";
/**
 * @returns {string} The default locale or an empty string if not set.
 */
export default function useDefaultLocale() {
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`useDefaultLocale(): No context provided. useDefaultLocale() can only be used inside a GTProvider.`);
        return "";
    }
    return ctx.defaultLocale || "";
}
//# sourceMappingURL=useDefaultLocale.js.map