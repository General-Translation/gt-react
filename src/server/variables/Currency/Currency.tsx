import React, { ReactNode } from 'react';

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
        ? new Intl.NumberFormat(locales, { style: 'currency', currency, numberingSystem: 'latn', ...options }).format(value) 
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

Currency.gtTransformation = "variable-currency";

export default Currency;