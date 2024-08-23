'use client'

import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';

const ClientNum = ({ children, name = "n", defaultValue, options = {} }: {
    children?: any;
    name?: string;
    defaultValue?: any; // Optional default value for the number
    options?: Intl.NumberFormatOptions // Optional options for the number formatting
} = { name: "n" }): ReactNode => {
    
    const locales = [useLocale(), useDefaultLocale()]
    
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    if (typeof value === 'number') {
        // Using Intl.NumberFormat for consistent number formatting
        value = new Intl.NumberFormat(locales, { numberingSystem: 'latn', ...options }).format(value);
    }

    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"number"} data-gt-variable-options={JSON.stringify(options)}>
            {value}
        </span>
    );
};

ClientNum.gtTransformation = "variable-number";

export default ClientNum;
