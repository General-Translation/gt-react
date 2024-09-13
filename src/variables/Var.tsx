import React, { ReactNode } from 'react';

const Var = ({ children, name = "value", defaultValue, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any;
    "data-generaltranslation"?: Record<string, any> | undefined
}): ReactNode  => {
    
    const { "data-generaltranslation": generaltranslation } = props;
    
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') defaultValue = children;

    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"variable"}
            data-gt-unformatted-value={defaultValue ?? undefined}
        >
            {defaultValue}
        </span>
    );

};

Var.gtTransformation = "variable-variable"; // keep this because Var is imported in other functions

export default Var;