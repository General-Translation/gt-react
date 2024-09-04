import { formatNum } from 'generaltranslation';
import React, { ReactNode } from 'react';

const Num = ({ children, locales, name = "n", defaultValue, options = {}, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined,
    locales: string[];
    options?: Intl.NumberFormatOptions
}): ReactNode => {

    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the value to be used
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;

    // Format the number according to the locale
    const formattedValue = (typeof value === 'number') ? formatNum({ value, languages: locales, options }) : defaultValue;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"number"} 
            data-gt-variable-options={options}
            data-gt-unformatted-value={value}
        >
            {formattedValue}
        </span>
    );

};

Num.gtTransformation = "variable-number";

export default Num;