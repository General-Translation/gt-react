var defaultVariableNames = {
    "variable": "value",
    "number": "n",
    "datetime": "date",
    "currency": "cost"
};
export function getFallbackVariableName(variableType) {
    if (variableType === void 0) { variableType = "variable"; }
    return defaultVariableNames[variableType] || "variable";
}
export var baseVariablePrefix = "_gt_";
export default function getVariableName(props, variableType) {
    var _a;
    if (props === void 0) { props = {}; }
    if (props.name)
        return props.name;
    if (props['data-_gt-variable-name'])
        return props['data-_gt-variable-name'];
    var baseVariableName = defaultVariableNames[variableType] || "value";
    return "".concat(baseVariablePrefix).concat(baseVariableName, "_").concat((_a = props['data-_gt']) === null || _a === void 0 ? void 0 : _a.id);
}
//# sourceMappingURL=getVariableName.js.map