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
    const locale = (0, useLocale_1.default)();
    const [formattedValue, setFormattedValue] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
        value = (typeof value === 'string') ? parseFloat(value) : value;
        if (typeof value === 'number') {
            // Using Intl.NumberFormat for consistent number formatting
            setFormattedValue(new Intl.NumberFormat(locale, Object.assign({ numberingSystem: 'latn' }, options)).format(value));
        }
        else {
            setFormattedValue(value);
        }
    }, [children, defaultValue, locale, options]);
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": JSON.stringify(options), children: formattedValue }));
};
ClientNumberVariable.gtTransformation = "variable-number";
exports.default = ClientNumberVariable;
//# sourceMappingURL=ClientNumberVariable.js.map