'use client'

import { formatDateTime } from 'generaltranslation';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';

/**
 * The `<DateTime>` component renders a formatted date or time string, allowing customization of the name, default value, and formatting options.
 * It utilizes the current locale and optional format settings to display the date.
 * Must be used inside a `<GTProvider>`.
 *
 * @example
 * ```jsx
 * <DateTime
 *    name="createdAt"
 * >
 *    {new Date()}
 * </DateTime>
 * ```
 *
 * @param {any} [children] - Optional content (typically a date) to render inside the component.
 * @param {string} [name="date"] - Optional name for the date field, used for metadata purposes.
 * @param {string|number|Date} [defaultValue] - The default value for the date. Can be a string, number (timestamp), or `Date` object.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Optional formatting options for the date, following `Intl.DateTimeFormatOptions` specifications.
 * @returns {JSX.Element} The formatted date or time component.
 */
function DateTime({ children, name = "date", defaultValue, options = {} }: {
    children?: any;
    name?: string;
    defaultValue?: any; // The default value which can be string, number or Date
    options?: Intl.DateTimeFormatOptions; // Optional formatting options for the date
} = { name: "date" }): JSX.Element {

    const locales = [useLocale(), useDefaultLocale()]

    let final;

    let dateValue: Date | undefined;
    defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue);
    } else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    } else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (formatDateTime({ value: dateValue, languages: locales, options })).replace(/[\u200F\u202B\u202E]/g, '');
    }

    // Render the formatted date within a span element
    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"date"} data-gt-variable-options={options}>
            {final}
        </span>
    );
};

// Static property for transformation type
DateTime.gtTransformation = "variable-datetime";

export default DateTime;
