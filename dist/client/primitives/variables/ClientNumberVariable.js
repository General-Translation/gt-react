'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import useLocale from '../../hooks/useLocale';
import useDefaultLocale from '../../hooks/useDefaultLocale';
/**
 * NumberVariable component formats and displays a number based on the current language settings.
 * It attempts a number conversion and defaults to returning defaultValue if provided.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {ReactNode} A span element containing the formatted number with specific data attributes
 */
const ClientNumberVariable = ({ children, name = "n", defaultValue, options = {} } = { name: "n" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        if (typeof value === 'number') {
            // Using Intl.NumberFormat for consistent number formatting
            setFormattedValue(new Intl.NumberFormat(locales, Object.assign({ numberingSystem: 'latn' }, options)).format(value));
        }
        else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locales, options]);
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": JSON.stringify(options), children: formattedValue }));
};
ClientNumberVariable.gtTransformation = "variable-number";
export default ClientNumberVariable;
//# sourceMappingURL=ClientNumberVariable.js.map