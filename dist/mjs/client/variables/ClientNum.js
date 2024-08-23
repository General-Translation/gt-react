'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
const ClientNum = ({ children, name = "n", defaultValue, options = {} } = { name: "n" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    if (typeof value === 'number') {
        // Using Intl.NumberFormat for consistent number formatting
        value = new Intl.NumberFormat(locales, Object.assign({ numberingSystem: 'latn' }, options)).format(value);
    }
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": JSON.stringify(options), children: value }));
};
ClientNum.gtTransformation = "variable-number";
export default ClientNum;
//# sourceMappingURL=ClientNum.js.map