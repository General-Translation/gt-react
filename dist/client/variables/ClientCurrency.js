'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
const ClientCurrency = ({ children, name = "cost", defaultValue, currency = "USD", options = {} } = { name: "cost" }) => {
    const locales = [useLocale(), useDefaultLocale()];
    const [formattedValue, setFormattedValue] = useState('');
    useEffect(() => {
        // Determine the value to be formatted
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        // Format the value using Intl.NumberFormat
        if (typeof value === 'number') {
            setFormattedValue(new Intl.NumberFormat(locales, Object.assign({ style: 'currency', currency, numberingSystem: 'latn' }, options)).format(value));
        }
        else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locales, currency, options]);
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": Object.assign({ style: 'currency', currency }, options), children: formattedValue }));
};
// Static property to indicate the transformation type
ClientCurrency.gtTransformation = "variable-currency";
export default ClientCurrency;
//# sourceMappingURL=ClientCurrency.js.map