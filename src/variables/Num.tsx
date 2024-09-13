import { formatNum } from 'generaltranslation';
import React, { ReactNode } from 'react';
import getI18NConfig from '../utils/getI18NConfig';
import getLocale from '../request/getLocale';

const Num = ({ 
    children, name = "n", defaultValue, options = {}, ...props 
}: {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined,
    options?: Intl.NumberFormatOptions
}): ReactNode => {

    const I18NConfig = getI18NConfig();
    const locales = [ getLocale(), I18NConfig.getDefaultLocale() ]

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