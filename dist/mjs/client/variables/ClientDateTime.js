'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
const ClientDateTime = ({ children, name = "date", defaultValue, options = {} } = { name: "date" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    let final;
    let dateValue;
    defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    if (!defaultValue)
        return '';
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Unix time in seconds
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (new Intl.DateTimeFormat(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '').replace(/[\u200F\u202B\u202E]/g, '');
    }
    // Render the formatted date within a span element
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: final }));
};
// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";
export default ClientDateTime;
//# sourceMappingURL=ClientDateTime.js.map