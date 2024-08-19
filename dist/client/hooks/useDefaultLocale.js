'use client';
import { useGTContext } from "../ClientProvider";
/**
 * @returns {string} The default locale.
 */
export default function useDefaultLocale() {
    const { defaultLocale } = useGTContext();
    return defaultLocale;
}
//# sourceMappingURL=useDefaultLocale.js.map