import { ReactNode } from 'react';
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    options?: Record<string, any>;
};
/**
 * Num component formats and displays a number based on the current language settings.
 * It attempts a number conversion and defaults to returning defaultValue if provided.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {ReactNode} A span element containing the formatted number with specific data attributes
 */
declare const ClientNum: {
    ({ children, name, defaultValue, options }?: VariableProps): ReactNode;
    gtTransformation: string;
};
export default ClientNum;
//# sourceMappingURL=ClientNum.d.ts.map