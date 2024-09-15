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
 * @returns {JSX.Element} The rendered variable component with either `children` or `defaultValue`.
 */
function Var({ children, name = "value", defaultValue, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any;

    [key: string]: any
}): JSX.Element {
    
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