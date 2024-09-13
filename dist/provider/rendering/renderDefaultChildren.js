"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderDefaultChildren;
var react_1 = __importDefault(require("react"));
var getGTProp_1 = __importDefault(require("../helpers/getGTProp"));
var _getVariableProps_1 = __importDefault(require("../../variables/_getVariableProps"));
var renderTranslatedChildren_1 = require("./renderTranslatedChildren");
function renderDefaultChildren(_a) {
    var entry = _a.entry, _b = _a.variables, variables = _b === void 0 ? {} : _b, _c = _a.variablesOptions, variablesOptions = _c === void 0 ? {} : _c;
    var handleSingleChild = function (child) {
        if (react_1.default.isValidElement(child)) {
            var generaltranslation = (0, getGTProp_1.default)(child);
            if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                var _a = (0, _getVariableProps_1.default)(child.props), variableName = _a.variableName, variableType = _a.variableType, variableValue = _a.variableValue, variableOptions = _a.variableOptions;
                variableValue = variables[variableName] || variableValue;
                return (0, renderTranslatedChildren_1.renderVariable)({
                    variableName: variableName,
                    variableType: variableType,
                    variableValue: variableValue,
                    variableOptions: __assign(__assign({}, variablesOptions[variableName]), variableOptions)
                });
            }
            if (child.props.children) {
                return react_1.default.cloneElement(child, __assign(__assign({}, child.props), { children: handleChildren(child.props.children) }));
            }
        }
        return child;
    };
    var handleChildren = function (children) {
        return Array.isArray(children) ? react_1.default.Children.map(children, handleSingleChild) : handleSingleChild(children);
    };
    return handleChildren(entry);
}
//# sourceMappingURL=renderDefaultChildren.js.map