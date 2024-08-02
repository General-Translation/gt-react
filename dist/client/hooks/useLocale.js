'use client';
import { useContext } from "react";
import { GTContext } from "../ClientProvider";
/**
 * @returns {string} The current locale or an empty string if not set.
 */
export default function useLocale() {
    const ctx = useContext(GTContext);
    if (ctx === null || ctx === void 0 ? void 0 : ctx.locale) {
        return ctx.locale;
    }
    return "";
}
//# sourceMappingURL=useLocale.js.map