import React, { ReactNode } from 'react';

// VariableProps type
type VariableProps = {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined
}

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
const Var = ({ children, name = "value", defaultValue, ...props }: VariableProps): ReactNode  => {
    
    const { "data-generaltranslation": generaltranslation } = props;
    
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') defaultValue = children;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"variable"}
        >
            {defaultValue}
        </span>
    );

};

Var.gtTransformation = "variable-variable"; // keep this because Var is imported in other functions

export default Var;