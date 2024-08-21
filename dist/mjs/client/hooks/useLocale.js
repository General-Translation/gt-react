'use client';
import { useGTContext } from "../ClientProvider";
/**
 * @returns {string} The user's current locale.
 */
export default function useLocale() {
    const { locale } = useGTContext();
    return locale;
}
//# sourceMappingURL=useLocale.js.map