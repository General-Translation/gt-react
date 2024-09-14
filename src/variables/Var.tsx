'use client'

import { ReactNode } from 'react';

/**
 * The `<Var>` component renders a variable value, which can either be passed as `children` or a `defaultValue`.
 * If `children` is provided, it will be used; otherwise, the `defaultValue` is rendered.
 *
 * @example
 * ```jsx
 * <Var
 *    name="username"
 * >
 *    John
 * </Var>
 * ```
 *
 * @param {any} [children] - The content to render inside the component. If provided, it will take precedence over `defaultValue`.
 * @param {string} [name] - Optional name for the variable, used for metadata purposes.
 * @param {any} [defaultValue] - The default value to be displayed if `children` is not provided.
 * @returns {ReactNode} The rendered variable component with either `children` or `defaultValue`.
 */
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