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
function Currency({ children, name = "cost", value, currency = "USD", options = {} }: {
    children?: any;
    name?: string;
    value?: any;
    currency?: string;
    options?: Intl.NumberFormatOptions;
} = { name: "cost" }): JSX.Element {

    const locales = [useLocale(), useDefaultLocale()]

    let renderedValue = (typeof children !== 'undefined' && typeof value === 'undefined') ? children : value;
    renderedValue = (typeof renderedValue === 'string') ? parseFloat(renderedValue) : renderedValue;
    // Format the value using Intl.NumberFormat
    if (typeof renderedValue === 'number') {
        renderedValue = formatCurrency({ value: renderedValue, languages: locales, currency, options });
    }

    return (
        <span data-_gt-variable-name={name} data-_gt-variable-type={"currency"} data-_gt-variable-options={{ style: 'currency', currency, ...options }}>
            {renderedValue}
        </span>
    );

};

// Static property to indicate the transformation type
Currency.gtTransformation = "variable-currency";

export default Currency;
