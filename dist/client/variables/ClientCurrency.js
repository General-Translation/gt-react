'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
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
 * @returns {ReactNode} A span element containing the formatted currency with specific data attributes
 */
const ClientCurrency = ({ children, name = "cost", defaultValue, currency = "USD", options = {} } = { name: "cost" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        // Determine the value to be formatted
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        // Format the value using Intl.NumberFormat
        if (typeof value === 'number') {
            setFormattedValue(new Intl.NumberFormat(locales, Object.assign({ style: 'currency', currency, numberingSystem: 'latn' }, options)).format(value));
        }
        else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locales, currency, options]);
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": Object.assign({ style: 'currency', currency }, options), children: formattedValue }));
};
// Static property to indicate the transformation type
ClientCurrency.gtTransformation = "variable-currency";
export default ClientCurrency;
//# sourceMappingURL=ClientCurrency.js.map