'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
const ClientDateTime = ({ children, name = "date", defaultValue, options = {} } = { name: "date" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        let dateValue;
        // Determine the default value to use
        defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        if (!defaultValue) {
            setFormattedValue('');
            return;
        }
        // Convert defaultValue to a Date object based on its type
        if (typeof defaultValue === 'number') {
            dateValue = new Date(defaultValue * 1000); // Unix time in seconds
        }
        else if (typeof defaultValue === 'string') {
            dateValue = new Date(defaultValue);
        }
        else if (defaultValue instanceof Date) {
            dateValue = defaultValue;
        }
        // Return an empty string if dateValue is undefined
        if (typeof dateValue !== 'undefined') {
            // Format the date using Intl.DateTimeFormat or toLocaleString
            const dateString = new Intl.DateTimeFormat(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '';
            setFormattedValue(dateString.replace(/[\u200F\u202B\u202E]/g, ''));
        }
    }, [children, defaultValue, options, locales]);
    // Render the formatted date within a span element
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: formattedValue }));
};
// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";
export default ClientDateTime;
//# sourceMappingURL=ClientDateTime.js.map