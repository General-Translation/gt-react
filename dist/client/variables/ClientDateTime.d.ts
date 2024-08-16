import { ReactNode } from 'react';
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    options?: Record<string, any>;
};
/**
 * DateTime component formats and displays a date based on the current language settings.
 * It converts different types of date inputs and formats them according to the locale.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number | Date | string} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for date formatting.
 * @returns {ReactNode} A span element containing the formatted date with specific data attributes
 */
declare const ClientDateTime: {
    ({ children, name, defaultValue, options }?: VariableProps): ReactNode;
    gtTransformation: string;
};
export default ClientDateTime;
//# sourceMappingURL=ClientDateTime.d.ts.map