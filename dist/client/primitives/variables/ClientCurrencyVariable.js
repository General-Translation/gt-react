"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useLocale_1 = __importDefault(require("../../hooks/useLocale"));
/**
 * CurrencyVariable component formats a number as a currency string based on the current language settings.
 * It uses Intl.NumberFormat for currency formatting.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {string} [props.currency="USD"] - The currency code to use for formatting.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {ReactNode} A span element containing the formatted currency with specific data attributes
 */
const ClientCurrencyVariable = ({ children, name = "cost", defaultValue, currency = "USD", options = {} } = { name: "cost" }) => {
    const locale = (0, useLocale_1.default)();
    const [formattedValue, setFormattedValue] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        // Determine the value to be formatted
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        // Format the value using Intl.NumberFormat
        if (typeof value === 'number') {
            setFormattedValue(new Intl.NumberFormat(locale, Object.assign({ style: 'currency', currency, numberingSystem: 'latn' }, options)).format(value));
        }
        else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locale, currency, options]);
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "currency", "data-gt-variable-options": Object.assign({ style: 'currency', currency }, options), children: formattedValue }));
};
// Static property to indicate the transformation type
ClientCurrencyVariable.gtTransformation = "variable-currency";
exports.default = ClientCurrencyVariable;
//# sourceMappingURL=ClientCurrencyVariable.js.map