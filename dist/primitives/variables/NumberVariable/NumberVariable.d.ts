import { ReactNode } from 'react';
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined;
    locales: string[];
    options?: Record<string, any>;
};
/**
 * NumberVariable component formats and displays a number based on the current locale.
 * It attempts a number conversion and defaults to returning defaultValue if provided.
 *
 * @param {VariableProps} props - The properties passed to the component
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {number} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @param {Record<string, any>} [props.options] - Options for number formatting.
 * @returns {JSX.Element} A span element containing the formatted number with specific data attributes
 */
declare const NumberVariable: {
    ({ children, locales, name, defaultValue, options, ...props }: VariableProps): ReactNode;
    gtTransformation: string;
};
export default NumberVariable;
//# sourceMappingURL=NumberVariable.d.ts.map