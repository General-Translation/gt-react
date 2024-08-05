import React, { ReactNode } from 'react';

// VariableProps type definition
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined,
    locales: string[];
    options?: Record<string, any>
}

/**
 * Num component formats and displays a number based on the current locale.
 * It attempts a number conversion and defaults to returning defaultValue if provided.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {JSX.Element} A span element containing the formatted number with specific data attributes
 */
const Num = ({ children, locales, name = "n", defaultValue, options = {}, ...props }: VariableProps): ReactNode => {

    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the value to be used
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;

    // Format the number according to the locale
    const formattedValue = (typeof value === 'number') ? new Intl.NumberFormat(locales, { numberingSystem: 'latn', ...options }).format(value) : defaultValue;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"number"} 
            data-gt-variable-options={options}
        >
            {formattedValue}
        </span>
    );

};

Num.gtTransformation = "variable-number";

export default Num;