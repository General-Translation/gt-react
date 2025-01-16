import { jsx as _jsx } from "react/jsx-runtime";
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
 * @param {string|number|Date} [value] - The default value for the date. Can be a string, number (timestamp), or `Date` object.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Optional formatting options for the date, following `Intl.DateTimeFormatOptions` specifications.
 * @returns {JSX.Element} The formatted date or time component.
 */
function DateTime(_a) {
    var children = _a.children, value = _a.value, name = _a.name, locales = _a.locales, _b = _a.options, options = _b === void 0 ? {} : _b;
    var providerLocales = [useLocale(), useDefaultLocale()];
    locales || (locales = providerLocales);
    var final;
    var dateValue;
    var defaultValue = (typeof children !== 'undefined' && typeof value === 'undefined') ? children : value;
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue);
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (formatDateTime({ value: dateValue, locales: locales, options: options })).replace(/[\u200F\u202B\u202E]/g, '');
    }
    // Render the formatted date within a span element
    return (_jsx("span", { "data-_gt-variable-name": name, "data-_gt-variable-type": "date", "data-_gt-variable-options": JSON.stringify(options), style: { display: 'contents' }, suppressHydrationWarning: true, children: final }));
}
;
// Static property for transformation type
DateTime.gtTransformation = "variable-datetime";
export default DateTime;
//# sourceMappingURL=DateTime.js.map