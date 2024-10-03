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
        variableValue: (() => {
            if (typeof props.value !== 'undefined') return props.value;
            if (typeof props['data-gt-unformatted-value'] !== 'undefined') return props['data-gt-unformatted-value'];
            if (typeof props.children !== 'undefined') return props.children;
            return undefined;
        }
        )(),
        variableOptions: props.options || props['data-gt-variable-options'] || undefined
    };

    return result;
}