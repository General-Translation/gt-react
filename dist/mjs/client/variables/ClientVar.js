'use client';
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Var component to conditionally render either children or a default value.
 * It also attaches data attributes for variable name and type.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} [props.children] - The child elements to be rendered if provided.
 * @param {string} props.name - The name attribute for the variable.
 * @param {any} [props.defaultValue] - The default value to be rendered if children is not provided.
 * @returns {ReactNode} The rendered output.
 */
const ClientVar = ({ children, name, defaultValue }) => {
    let final = typeof children !== 'undefined' ? children : defaultValue;
    return (_jsx("span", { "data-gt-variable-name": name, "data-gt-variable-type": "variable", children: final }));
};
ClientVar.gtTransformation = "variable-variable";
export default ClientVar;
//# sourceMappingURL=ClientVar.js.map