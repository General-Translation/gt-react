import React, { ReactNode } from 'react';
import { formatCurrency } from 'generaltranslation';

const Currency = ({ children, locales, name = "cost", defaultValue, currency = "USD", options = {}, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    locales: string[];
    currency?: string;
    "data-generaltranslation"?: Record<string, any>;
    options?: Intl.NumberFormatOptions;
}): ReactNode => {

    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the value to be formatted
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;

    // Format the number as currency according to the locale
    const formattedValue = (typeof value === 'number') 
        ? formatCurrency({ value, currency, languages: locales, options })
        : value;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"currency"} 
            data-gt-variable-options={{ style: 'currency', currency, ...options }}
            data-gt-unformatted-value={value}
        >
            {formattedValue}
        </span>
    );
};

Currency.gtTransformation = "variable-currency";

export default Currency;