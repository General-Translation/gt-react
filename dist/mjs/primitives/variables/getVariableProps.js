import defaultVariableNames from "./defaultVariableNames";
export default function getVariableProps(props) {
    var _a;
    const variableType = ((_a = props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.variableType) || "variable";
    const result = {
        variableType,
        variableName: props.name || props['data-gt-variable-name'] || defaultVariableNames[variableType],
        variableValue: ((typeof props.defaultValue !== 'undefined') ? props.defaultValue :
            (typeof props['data-gt-unformatted-value'] !== 'undefined') ? props['data-gt-unformatted-value'] :
                (typeof props.children !== 'undefined') ? props.children : undefined),
        variableOptions: props.options || props['data-gt-variable-options'] || undefined
    };
    return result;
}
//# sourceMappingURL=getVariableProps.js.map