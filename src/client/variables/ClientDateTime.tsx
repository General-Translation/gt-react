'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';

// VariableProps type defines the properties accepted by the component
type VariableProps = {
    children?: any;
    name: string;
    defaultValue?: any; // The default value which can be string, number or Date
    options?: Record<string, any>; // Optional formatting options for the date
}

/**
 * DateTime component formats and displays a date based on the current language settings.
 * It converts different types of date inputs and formats them according to the locale.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number | Date | string} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for date formatting.
 * @returns {ReactNode} A span element containing the formatted date with specific data attributes
 */
const ClientDateTime = ({ children, name = "date", defaultValue, options = {} }: VariableProps = { name: "date" }): ReactNode => {

    const locales = [useLocale(), useDefaultLocale()]

    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        let dateValue: Date | undefined;

        // Determine the default value to use
        defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        if (!defaultValue) {
            setFormattedValue('');
            return;
        }

        // Convert defaultValue to a Date object based on its type
        if (typeof defaultValue === 'number') {
            dateValue = new Date(defaultValue * 1000); // Unix time in seconds
        } else if (typeof defaultValue === 'string') {
            dateValue = new Date(defaultValue);
        } else if (defaultValue instanceof Date) {
            dateValue = defaultValue;
        }

        // Return an empty string if dateValue is undefined
    
        if (typeof dateValue !== 'undefined') {
            // Format the date using Intl.DateTimeFormat or toLocaleString
            const dateString = new Intl.DateTimeFormat(locales, { calendar: "gregory", numberingSystem: "latn", ...options }).format(dateValue) || dateValue?.toLocaleString(locales, { calendar: "gregory", numberingSystem: "latn", ...options }) || '';
            setFormattedValue(dateString.replace(/[\u200F\u202B\u202E]/g, ''));
        }

    }, [children, defaultValue, options, locales]);

    // Render the formatted date within a span element
    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"date"} data-gt-variable-options={options}>
            {formattedValue}
        </span>
    );
};

// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";

export default ClientDateTime;
