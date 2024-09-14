'use client'

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
 * @param {any} [defaultValue] - The default value to be used.
 * @param {string} [currency] - The currency type (e.g., USD, EUR, etc.).
 * @param {Intl.NumberFormatOptions} [options] - Optional formatting options to customize how the currency is displayed.
 * @returns {JSX.Element} The formatted currency component.
 */
function Currency({ children, name = "cost", defaultValue, currency = "USD", options = {} }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    currency?: string;
    options?: Intl.NumberFormatOptions;
} = { name: "cost" }): JSX.Element {

    const locales = [useLocale(), useDefaultLocale()]

    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the value using Intl.NumberFormat
    if (typeof value === 'number') {
        value = formatCurrency({ value, languages: locales, currency, options });
    }

    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"currency"} data-gt-variable-options={{ style: 'currency', currency, ...options }}>
            {value}
        </span>
    );

};

// Static property to indicate the transformation type
Currency.gtTransformation = "variable-currency";

export default Currency;
