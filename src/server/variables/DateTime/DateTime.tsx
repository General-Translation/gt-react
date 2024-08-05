import React from 'react';

// VariableProps type defines the properties accepted by the component
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any; // The default value which can be number, string, or Date
    locales: string[];
    options?: Record<string, any>; // Optional formatting options for the date
    "data-generaltranslation"?: Record<string, any> | undefined; // Optional general translation data
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
 * @returns {JSX.Element} A span element containing the formatted date with specific data attributes
 */
const DateTime = ({ children, locales, name = "date", defaultValue, options = {}, ...props }: VariableProps): JSX.Element => {

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
    const dateString = new Intl.DateTimeFormat(locales, { calendar: "gregory", numberingSystem: "latn", ...options }).format(dateValue) || dateValue?.toLocaleString(locales, { calendar: "gregory", numberingSystem: "latn", ...options }) || '';
    const formattedValue = dateString.replace(/[\u200F\u202B\u202E]/g, '')

    // Render the formatted date within a span element
    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"date"} 
            data-gt-variable-options={options}
        >
            {formattedValue}
        </span>
    );
};

DateTime.gtTransformation = "variable-date"

export default DateTime;