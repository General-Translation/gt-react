import { ReactNode } from 'react';
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined;
};
/**
 * Variable component to conditionally render either children or a default value.
 * It also attaches data attributes for variable name and type.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {any} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @returns {ReactNode} The rendered output.
 */
declare const Variable: {
    ({ children, name, defaultValue, ...props }: VariableProps): ReactNode;
    gtTransformation: string;
};
export default Variable;
//# sourceMappingURL=Variable.d.ts.map