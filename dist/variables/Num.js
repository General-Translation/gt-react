import { jsx as _jsx } from "react/jsx-runtime";
import { formatNum } from 'generaltranslation';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
/**
 * The `<Num>` component renders a formatted number string, allowing customization of the name, default value, and formatting options.
 * It formats the number according to the current locale and optionally passed formatting options.
 * Must be used inside a `<GTProvider>`.
 *
 * @example
 * ```jsx
 * <Num
 *    name="quantity"
 *    options={{ style: "decimal", maximumFractionDigits: 2 }}
 * >
 *    1000
 * </Num>
 * ```
 *
 * @param {any} [children] - Optional content (typically a number) to render inside the component.
 * @param {string} [name="n"] - Optional name for the number field, used for metadata purposes.
 * @param {string|number} [value] - The default value for the number. Can be a string or number. Strings will be parsed to numbers.
 * @param {Intl.NumberFormatOptions} [options={}] - Optional formatting options for the number, following `Intl.NumberFormatOptions` specifications.
 * @returns {JSX.Element} The formatted number component.
 */
function Num(_a) {
    var children = _a.children, value = _a.value, name = _a.name, locales = _a.locales, _b = _a.options, options = _b === void 0 ? {} : _b;
    var providerLocales = [useLocale(), useDefaultLocale()];
    locales || (locales = providerLocales);
    var renderedValue = (typeof children !== 'undefined') ? children : value;
    renderedValue = (typeof renderedValue === 'string') ? parseFloat(renderedValue) : renderedValue;
    var formattedValue = renderedValue;
    if (typeof renderedValue === 'number') {
        // Using Intl.NumberFormat for consistent number formatting
        formattedValue = formatNum({ value: renderedValue, locales: locales, options: options });
    }
    return (_jsx("span", { "data-_gt-variable-name": name, "data-_gt-variable-type": "number", "data-_gt-variable-options": JSON.stringify(options), style: { display: 'contents' }, suppressHydrationWarning: true, children: formattedValue }));
}
;
Num.gtTransformation = "variable-number";
export default Num;
//# sourceMappingURL=Num.js.map