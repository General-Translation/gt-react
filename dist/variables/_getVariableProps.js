var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import getVariableName from "./getVariableName";
export default function getVariableProps(props) {
    var _a;
    var variableType = ((_a = props['data-_gt']) === null || _a === void 0 ? void 0 : _a.variableType) || "variable";
    var result = {
        variableType: variableType,
        variableName: getVariableName(props, variableType),
        variableValue: (function () {
            if (typeof props.value !== 'undefined')
                return props.value;
            if (typeof props['data-_gt-unformatted-value'] !== 'undefined')
                return props['data-_gt-unformatted-value'];
            if (typeof props.children !== 'undefined')
                return props.children;
            return undefined;
        })(),
        variableOptions: (function () {
            var variableOptions = __assign(__assign({}, (props.currency && { currency: props.currency })), (props.options && __assign({}, props.options)));
            if (Object.keys(variableOptions).length)
                return variableOptions;
            if (typeof props['data-_gt-variable-options'] === 'string')
                return JSON.parse(props['data-_gt-variable-options']);
            return props['data-_gt-variable-options'] || undefined;
        })()
    };
    return result;
}
//# sourceMappingURL=_getVariableProps.js.map