'use client'

import useGTContext from "../provider/GTContext";

/**
 * @returns {string} The user's locale.
 */
export default function useLocale(): string {
    return useGTContext(
        "useLocale(): Unable to access user's locale outside of a <GTProvider>"
    ).locale;
}