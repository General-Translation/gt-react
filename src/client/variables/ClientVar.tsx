'use client'

import React, { useMemo, ReactNode } from 'react';

// VariableProps type
type VariableProps = {
    children?: any;
    name: string;
    defaultValue?: any;
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
const ClientVar = ({ children, name, defaultValue }: VariableProps): ReactNode => {

    const renderedValue = useMemo(() => {
        if ((typeof children !== 'undefined' && typeof defaultValue === 'undefined')) return children;
        return defaultValue;
    }, [children, defaultValue])
    
    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"variable"}>
            {renderedValue}
        </span>
    );

};

ClientVar.gtTransformation = "variable-variable";

export default ClientVar;