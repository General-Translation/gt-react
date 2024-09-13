import { formatDateTime } from 'generaltranslation';
import React from 'react';
import getI18NConfig from '../utils/getI18NConfig';
import getLocale from '../request/getLocale';

const DateTime = ({ children, name = "date", defaultValue, options = {}, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any; // The default value which can be number, string, or Date
    options?: Intl.DateTimeFormatOptions; // Optional formatting options for the date
    "data-generaltranslation"?: Record<string, any> | undefined; // Optional general translation data
}): JSX.Element => {

    const I18NConfig = getI18NConfig();
    const locales = [ getLocale(), I18NConfig.getDefaultLocale() ];

    // Extract general translation data from props
    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the default value to use
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') {
        defaultValue = children;
    }
    if (!defaultValue) {
        return (
            <span 
                data-generaltranslation={generaltranslation} 
                data-gt-variable-name={name} 
                data-gt-variable-type={"date"} 
                data-gt-variable-options={options}
            />
        )
    }

    // Convert defaultValue to a Date object if it's a Unix time, string, or Date object
    let dateValue: Date | undefined;
    
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Assuming Unix time is in seconds
    } else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    } else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }

    // Format the date according to the locale and options
    const dateString = dateValue ? formatDateTime({ value: dateValue, languages: locales, options }) : '';
    const formattedValue = dateString.replace(/[\u200F\u202B\u202E]/g, '')

    // Render the formatted date within a span element
    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"date"} 
            data-gt-variable-options={options}
            data-gt-unformatted-value={dateValue}
        >
            {formattedValue}
        </span>
    );
};

DateTime.gtTransformation = "variable-datetime"

export default DateTime;