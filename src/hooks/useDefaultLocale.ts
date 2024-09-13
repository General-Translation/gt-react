'use client'

import useGTContext from "../provider/GTContext";

/**
 * @returns {string} The default locale.
 */
export default function useDefaultLocale(): string {
    return useGTContext(
        "useDefaultLocale(): Unable to access default locale outside of a <GTProvider>"
    ).defaultLocale;
}
