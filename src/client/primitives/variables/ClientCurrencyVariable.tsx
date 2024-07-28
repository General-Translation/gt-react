'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../../hooks/useLocale';

/**
 * Props for the ClientCurrencyVariable component.
 * 
 * @typedef {Object} VariableProps
 * @property {ReactNode} [children] - The value to be formatted. If provided, overrides defaultValue.
 * @property {string} name - The name attribute for the data-gt-variable-name.
 * @property {number} [defaultValue] - The default value to be formatted if children is not provided.
 * @property {string} [currency] - The currency code to use for formatting. Default is "USD".
 * @property {Record<string, any>} [options] - Additional options to pass to the Intl.NumberFormat constructor.
 */
type VariableProps = {
    children?: any;
    name: string;
    defaultValue?: any;
    currency?: string;
    options?: Record<string, any>;
}

/**
 * CurrencyVariable component formats a number as a currency string based on the current language settings.
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
const ClientCurrencyVariable = ({ children, name = "cost", defaultValue, currency = "USD", options = {} }: VariableProps = { name: "cost" }): ReactNode => {

    const locale = useLocale();

    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        // Determine the value to be formatted
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        // Format the value using Intl.NumberFormat
        if (typeof value === 'number') {
            setFormattedValue(new Intl.NumberFormat(locale, { style: 'currency', currency, numberingSystem: 'latn', ...options }).format(value))
        } else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locale, currency, options]);

    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"currency"} data-gt-variable-options={{ style: 'currency', currency, ...options }}>
            {formattedValue}
        </span>
    );

};

// Static property to indicate the transformation type
ClientCurrencyVariable.gtTransformation = "variable-currency";

export default ClientCurrencyVariable;
