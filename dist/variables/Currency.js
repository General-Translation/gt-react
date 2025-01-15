var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { formatCurrency } from 'generaltranslation';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
/**
 * The `<Currency>` component renders a formatted currency string, allowing customization of name, default value, currency type, and formatting options.
 * Must be used inside a `<GTProvider>`.
 *
 * @example
 * ```jsx
 * <Currency
 *    name="price"
 *    currency="USD"
 * >
 *    1000
 * </Currency>
 * ```
 *
 * @param {any} [children] - Optional content to render inside the currency component.
 * @param {string} [name] - Optional name for the currency field.
 * @param {any} [value] - The default value to be used.
 * @param {string} [currency] - The currency type (e.g., USD, EUR, etc.).
 * @param {Intl.NumberFormatOptions} [options] - Optional formatting options to customize how the currency is displayed.
 * @returns {JSX.Element} The formatted currency component.
 */
function Currency(_a) {
    var children = _a.children, value = _a.value, name = _a.name, _b = _a.currency, currency = _b === void 0 ? "USD" : _b, locales = _a.locales, _c = _a.options, options = _c === void 0 ? {} : _c;
    var providerLocales = [useLocale(), useDefaultLocale()];
    locales || (locales = providerLocales);
    var renderedValue = (typeof children !== 'undefined' && typeof value === 'undefined') ? children : value;
    renderedValue = (typeof renderedValue === 'string') ? parseFloat(renderedValue) : renderedValue;
    // Format the value using Intl.NumberFormat
    if (typeof renderedValue === 'number') {
        renderedValue = formatCurrency({ value: renderedValue, locales: locales, currency: currency, options: options });
    }
    return (_jsx("span", { "data-_gt-variable-name": name, "data-_gt-variable-type": "currency", "data-_gt-variable-options": JSON.stringify(__assign({ style: 'currency', currency: currency }, options)), style: { display: 'contents' }, suppressHydrationWarning: true, children: renderedValue }));
}
;
// Static property to indicate the transformation type
Currency.gtTransformation = "variable-currency";
export default Currency;
//# sourceMappingURL=Currency.js.map