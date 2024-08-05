import { ReactNode } from 'react';
/**
 * Props for the ClientCurrency component.
 *
 * @typedef {Object} VariableProps
 * @property {ReactNode} [children] - The value to be formatted. If provided, overrides defaultValue.
 * @property {string} name - The name attribute for the data-gt-variable-name.
 * @property {number} [defaultValue] - The default value to be formatted if children is not provided.
 * @property {string} [currency] - The currency code to use for formatting. Default is "USD".
 * @property {Record<string, any>} [options] - Additional options to pass to the Intl.NumberFormat constructor.
 */
type VariableProps = {
    children?: any;
    name: string;
    defaultValue?: any;
    currency?: string;
    options?: Record<string, any>;
};
/**
 * Currency component formats a number as a currency string based on the current language settings.
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
declare const ClientCurrency: {
    ({ children, name, defaultValue, currency, options }?: VariableProps): ReactNode;
    gtTransformation: string;
};
export default ClientCurrency;
//# sourceMappingURL=ClientCurrency.d.ts.map