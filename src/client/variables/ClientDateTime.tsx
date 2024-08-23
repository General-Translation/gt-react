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

    let final;

    let dateValue: Date | undefined;
    defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    if (!defaultValue) return '';
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Unix time in seconds
    } else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    } else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (new Intl.DateTimeFormat(locales, { calendar: "gregory", numberingSystem: "latn", ...options }).format(dateValue) || dateValue?.toLocaleString(locales, { calendar: "gregory", numberingSystem: "latn", ...options }) || '').replace(/[\u200F\u202B\u202E]/g, '');
    }

    // Render the formatted date within a span element
    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"date"} data-gt-variable-options={options}>
            {final}
        </span>
    );
};

// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";

export default ClientDateTime;
