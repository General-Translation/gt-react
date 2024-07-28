import React, { ReactNode } from 'react';

/**
 * Props for the CurrencyVariable component.
 * 
 * @typedef {Object} VariableProps
 * @property {ReactNode} [children] - The value to be formatted. If provided, overrides defaultValue.
 * @property {string} name - The name attribute for the data-gt-variable-name.
 * @property {number} [defaultValue] - The default value to be formatted if children is not provided.
 * @property {string} [currency] - The currency code to use for formatting. Default is "USD".
 * @property {Record<string, any>} ["data-generaltranslation"] - General translation data passed to the component.
 * @property {Record<string, any>} [options] - Additional options to pass to the Intl.NumberFormat constructor.
 */
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    locale: string;
    currency?: string;
    "data-generaltranslation"?: Record<string, any>;
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
 * @returns {JSX.Element} A span element containing the formatted currency with specific data attributes
 */
const CurrencyVariable = ({ children, locale, name = "cost", defaultValue, currency = "USD", options = {}, ...props }: VariableProps): ReactNode => {

    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the value to be formatted
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;

    // Format the number as currency according to the locale
    const formattedValue = (typeof value === 'number') 
        ? new Intl.NumberFormat(locale, { style: 'currency', currency, numberingSystem: 'latn', ...options }).format(value) 
        : value;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"currency"} 
            data-gt-variable-options={{ style: 'currency', currency, ...options }}
        >
            {formattedValue}
        </span>
    );
};

CurrencyVariable.gtTransformation = "variable-currency";

export default CurrencyVariable;