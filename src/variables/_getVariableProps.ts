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
        variableName: props.name || props['data-_gt-variable-name'] || defaultVariableNames[variableType],
        variableValue: (() => {
            if (typeof props.value !== 'undefined') return props.value;
            if (typeof props['data-_gt-unformatted-value'] !== 'undefined') return props['data-_gt-unformatted-value'];
            if (typeof props.children !== 'undefined') return props.children;
            return undefined;
        }
        )(),
        variableOptions: props.options || props['data-_gt-variable-options'] || undefined
    };

    return result;
}