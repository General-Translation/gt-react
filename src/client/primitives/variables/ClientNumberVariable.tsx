'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../../hooks/useLocale';

// Type definition for the props that ClientNumberVariable component accepts
type VariableProps = {
    children?: any;
    name: string;
    defaultValue?: any; // Optional default value for the number
    options?: Record<string, any> // Optional options for the number formatting
}

/**
 * NumberVariable component formats and displays a number based on the current language settings.
 * It attempts a number conversion and defaults to returning defaultValue if provided.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {ReactNode} A span element containing the formatted number with specific data attributes
 */
const ClientNumberVariable = ({ children, name = "n", defaultValue, options = {} }: VariableProps = { name: "n" }): ReactNode => {
    const locale = useLocale();

    const [formattedValue, setFormattedValue] = useState('')
    useEffect(() => {
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        if (typeof value === 'number') {
            // Using Intl.NumberFormat for consistent number formatting
            setFormattedValue(new Intl.NumberFormat(locale, { numberingSystem: 'latn', ...options }).format(value))
        } else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locale, options]);

    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"number"} data-gt-variable-options={JSON.stringify(options)}>
            {formattedValue}
        </span>
    );
};

ClientNumberVariable.gtTransformation = "variable-number";

export default ClientNumberVariable;
