'use client';
import { useContext } from "react";
import { GTContext } from "../ClientProvider";
/**
 * @returns {string} The default locale or an empty string if not set.
 */
export default function useDefaultLocale() {
    const ctx = useContext(GTContext);
    if (ctx === null || ctx === void 0 ? void 0 : ctx.defaultLocale) {
        return ctx.defaultLocale;
    }
    return "";
}
//# sourceMappingURL=useDefaultLocale.js.map