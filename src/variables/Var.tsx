'use client'

import { ReactNode } from 'react';

const Var = ({ children, name, defaultValue }: {
    children?: any;
    name?: string;
    defaultValue?: any;
}): ReactNode => {

    let final = typeof children !== 'undefined' ? children : defaultValue;
    
    return (
        <span data-gt-variable-name={name} data-gt-variable-type={"variable"}>
            {final}
        </span>
    );

};

Var.gtTransformation = "variable-variable";

export default Var;