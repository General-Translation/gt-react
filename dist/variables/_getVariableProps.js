"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getVariableProps;
var _defaultVariableNames_1 = __importDefault(require("./_defaultVariableNames"));
function getVariableProps(props) {
    var _a;
    var variableType = ((_a = props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.variableType) || "variable";
    var result = {
        variableType: variableType,
        variableName: props.name || props['data-gt-variable-name'] || _defaultVariableNames_1.default[variableType],
        variableValue: (function () {
            if (typeof props.defaultValue !== 'undefined')
                return props.defaultValue;
            if (typeof props['data-gt-unformatted-value'] !== 'undefined')
                return props['data-gt-unformatted-value'];
            if (typeof props.children !== 'undefined')
                return props.children;
            return undefined;
        })(),
        variableOptions: props.options || props['data-gt-variable-options'] || undefined
    };
    return result;
}
//# sourceMappingURL=_getVariableProps.js.map