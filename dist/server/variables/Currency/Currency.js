var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Currency component formats a number as a currency string based on the current language settings.
 * It uses Intl.NumberFormat for currency formatting.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {string} [props.currency="USD"] - The currency code to use for formatting.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {JSX.Element} A span element containing the formatted currency with specific data attributes
 */
const Currency = (_a) => {
    var { children, locales, name = "cost", defaultValue, currency = "USD", options = {} } = _a, props = __rest(_a, ["children", "locales", "name", "defaultValue", "currency", "options"]);
    const { "data-generaltranslation": generaltranslation } = props;
    // Determine the value to be formatted
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the number as currency according to the locale
    const formattedValue = (typeof value === 'number')
        ? new Intl.NumberFormat(locales, Object.assign({ style: 'currency', currency, numberingSystem: 'latn' }, options)).format(value)
        : value;
    return (_jsx("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": Object.assign({ style: 'currency', currency }, options), children: formattedValue }));
};
Currency.gtTransformation = "variable-currency";
export default Currency;
//# sourceMappingURL=Currency.js.map