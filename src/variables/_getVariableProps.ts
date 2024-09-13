import defaultVariableNames from "./_defaultVariableNames";

export default function getVariableProps(props: { 
    'data-generaltranslation': {
        transformation: "variable",
        [key: string]: any
    }
    [key: string]: any 
}) {

    const variableType: "variable" | "number" | "datetime" | "currency" = props['data-generaltranslation']?.variableType || "variable"

    const result: {
        variableName: string,
        variableType: typeof variableType;
        variableValue?: any;
        variableOptions?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions
    } = {
        variableType,
        variableName: props.name || props['data-gt-variable-name'] || defaultVariableNames[variableType],
        variableValue: (
            (typeof props.defaultValue !== 'undefined') ? props.defaultValue : 
            (typeof props['data-gt-unformatted-value'] !== 'undefined') ? props['data-gt-unformatted-value'] :
            (typeof props.children !== 'undefined') ? props.children : undefined
        ),
        variableOptions: props.options || props['data-gt-variable-options'] || undefined
    };

    return result;
}