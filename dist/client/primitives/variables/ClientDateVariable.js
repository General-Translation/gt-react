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
 * DateVariable component formats and displays a date based on the current language settings.
 * It converts different types of date inputs and formats them according to the locale.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number | Date | string} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for date formatting.
 * @returns {ReactNode} A span element containing the formatted date with specific data attributes
 */
const ClientDateVariable = ({ children, name = "date", defaultValue, options = {} } = { name: "date" }) => {
    // Retrieve the current language using a custom hook
    const locale = (0, useLocale_1.default)();
    const [formattedValue, setFormattedValue] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
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
            const dateString = new Intl.DateTimeFormat(locale, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locale, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '';
            setFormattedValue(dateString.replace(/[\u200F\u202B\u202E]/g, ''));
        }
    }, [children, defaultValue, options, locale]);
    // Render the formatted date within a span element
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: formattedValue }));
};
// Static property for transformation type
ClientDateVariable.gtTransformation = "variable-date";
exports.default = ClientDateVariable;
//# sourceMappingURL=ClientDateVariable.js.map