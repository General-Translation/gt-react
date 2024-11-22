"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseVariablePrefix = void 0;
exports.getFallbackVariableName = getFallbackVariableName;
exports.default = getVariableName;
var defaultVariableNames = {
    "variable": "value",
    "number": "n",
    "datetime": "date",
    "currency": "cost"
};
function getFallbackVariableName(variableType) {
    if (variableType === void 0) { variableType = "variable"; }
    return defaultVariableNames[variableType] || "variable";
}
exports.baseVariablePrefix = "_gt_";
function getVariableName(props, variableType) {
    if (props === void 0) { props = {}; }
    if (props.name)
        return props.name;
    if (props['data-_gt-variable-name'])
        return props['data-_gt-variable-name'];
    var baseVariableName = defaultVariableNames[variableType] || "value";
    return "".concat(exports.baseVariablePrefix).concat(baseVariableName, "_").concat(props['data-_gt'].id);
}
//# sourceMappingURL=getVariableName.js.map