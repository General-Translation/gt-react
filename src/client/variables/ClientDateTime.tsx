'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';

const ClientDateTime = ({ children, name = "date", defaultValue, options = {} }: {
    children?: any;
    name?: string;
    defaultValue?: any; // The default value which can be string, number or Date
    options?: Intl.DateTimeFormatOptions; // Optional formatting options for the date
} = { name: "date" }): ReactNode => {

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
