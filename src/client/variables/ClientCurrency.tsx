'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';

const ClientCurrency = ({ children, name = "cost", defaultValue, currency = "USD", options = {} }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    currency?: string;
    options?: Intl.NumberFormatOptions;
} = { name: "cost" }): ReactNode => {

    const locales = [useLocale(), useDefaultLocale()]

    const [formattedValue, setFormattedValue] = useState('');

    useEffect(() => {
        // Determine the value to be formatted
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        // Format the value using Intl.NumberFormat
        if (typeof value === 'number') {
            setFormattedValue(new Intl.NumberFormat(locales, { style: 'currency', currency, numberingSystem: 'latn', ...options }).format(value))
        } else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locales, currency, options]);

    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"currency"} data-gt-variable-options={{ style: 'currency', currency, ...options }}>
            {formattedValue}
        </span>
    );

};

// Static property to indicate the transformation type
ClientCurrency.gtTransformation = "variable-currency";

export default ClientCurrency;
