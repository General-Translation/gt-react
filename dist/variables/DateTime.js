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
    var _b = _a === void 0 ? { name: "date" } : _a, children = _b.children, _c = _b.name, name = _c === void 0 ? "date" : _c, value = _b.value, _d = _b.options, options = _d === void 0 ? {} : _d;
    var locales = [useLocale(), useDefaultLocale()];
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
        final = (formatDateTime({ value: dateValue, languages: locales, options: options })).replace(/[\u200F\u202B\u202E]/g, '');
    }
    // Render the formatted date within a span element
    return (_jsx("span", { "data-_gt-variable-name": name, "data-_gt-variable-type": "date", "data-_gt-variable-options": options, children: final }));
}
;
// Static property for transformation type
DateTime.gtTransformation = "variable-datetime";
export default DateTime;
//# sourceMappingURL=DateTime.js.map