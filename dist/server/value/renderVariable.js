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
exports.default = renderVariable;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var isValidReactNode_1 = __importDefault(require("../../primitives/rendering/isValidReactNode"));
var Var_1 = __importDefault(require("../variables/Var"));
var Currency_1 = __importDefault(require("../variables/Currency"));
var Num_1 = __importDefault(require("../variables/Num"));
var DateTime_1 = __importDefault(require("../variables/DateTime"));
var defaultVariableNames_1 = __importDefault(require("../../primitives/variables/defaultVariableNames"));
/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
var handleSingleChild = function (child, locales, variables) {
    var _a;
    if (react_1.default.isValidElement(child)) {
        var props = child.props, type = child.type;
        // Check if a variable component
        var transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        if (variables && (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable"))) {
            var variableType = ((_a = transformation.split('-')) === null || _a === void 0 ? void 0 : _a[1]) || "variable";
            var name_1 = props.name || defaultVariableNames_1.default[variableType];
            var value = variables[name_1];
            var options = (props === null || props === void 0 ? void 0 : props.options) || {};
            if (variableType === "number") {
                return (0, jsx_runtime_1.jsx)(Num_1.default, { locales: locales, defaultValue: value, name: name_1, options: options });
            }
            if (variableType === "datetime") {
                return (0, jsx_runtime_1.jsx)(DateTime_1.default, { locales: locales, defaultValue: value, name: name_1, options: options });
            }
            if (variableType === "currency") {
                return (0, jsx_runtime_1.jsx)(Currency_1.default, { locales: locales, defaultValue: value, name: name_1, options: options });
            }
            return (0, jsx_runtime_1.jsx)(Var_1.default, { defaultValue: value, name: name_1 });
        }
        var newProps = __assign({}, props);
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = renderVariable(props.children, locales, variables);
        }
        return react_1.default.cloneElement(child, newProps);
    }
    if ((0, isValidReactNode_1.default)(child))
        return child;
};
/**
 * Recursively renders a variable structure of children, handling arrays of children and single child elements.
 *
 * @param {any} children - The children elements to render.
 * @param {string} locale - The user's locale.
 * @returns {any} The rendered children elements.
 */
function renderVariable(children, locales, variables) {
    if (Array.isArray(children))
        return children.map(function (child, index) { return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: handleSingleChild(child, locales, variables) }, index); });
    else
        return handleSingleChild(children, locales, variables);
}
//# sourceMappingURL=renderVariable.js.map