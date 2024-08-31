"use strict";
'use client';
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
exports.default = RenderClientVariable;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var ClientVar_1 = __importDefault(require("../variables/ClientVar"));
var ClientNum_1 = __importDefault(require("../variables/ClientNum"));
var ClientDateTime_1 = __importDefault(require("../variables/ClientDateTime"));
var ClientCurrency_1 = __importDefault(require("../variables/ClientCurrency"));
var defaultVariableNames_1 = __importDefault(require("../../primitives/variables/defaultVariableNames"));
var ClientProvider_1 = require("../ClientProvider");
/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
function SingleChild(_a) {
    var _b;
    var children = _a.children, variables = _a.variables;
    var translate = (0, ClientProvider_1.useGTContext)().translate;
    if (!children || typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean')
        return children;
    if (react_1.default.isValidElement(children)) {
        var props = children.props, type = children.type;
        var transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        // handle any nested <T> components
        if (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("translate")) {
            var translation = translate(props.id);
            return (0, jsx_runtime_1.jsx)(RenderClientVariable, { variables: variables, children: translation });
        }
        // handle variables
        if (variables) {
            var value = void 0;
            var variableType = void 0;
            var name_1;
            var options = void 0;
            if (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable")) {
                variableType = ((_b = transformation.split('-')) === null || _b === void 0 ? void 0 : _b[1]) || "variable";
                name_1 = props.name || defaultVariableNames_1.default[variableType];
                value = variables[name_1];
                options = (props === null || props === void 0 ? void 0 : props.options) || {};
            }
            if (props && (props === null || props === void 0 ? void 0 : props['data-gt-variable-type'])) {
                variableType = props['data-gt-variable-type'];
                name_1 = props['data-gt-variable-name'];
                value = variables[name_1];
                options = props['data-gt-variable-options'];
            }
            if (value !== null && typeof value !== 'undefined') {
                if (variableType === "number") {
                    return (0, jsx_runtime_1.jsx)(ClientNum_1.default, { defaultValue: value, name: name_1, options: options });
                }
                if (variableType === "date") {
                    return (0, jsx_runtime_1.jsx)(ClientDateTime_1.default, { defaultValue: value, name: name_1, options: options });
                }
                if (variableType === "currency") {
                    var currency = props.currency || 'USD';
                    return (0, jsx_runtime_1.jsx)(ClientCurrency_1.default, { defaultValue: value, name: name_1, currency: currency, options: options });
                }
                return (0, jsx_runtime_1.jsx)(ClientVar_1.default, { defaultValue: value, name: name_1 });
            }
        }
        var newProps = __assign({}, props);
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = react_1.default.Children.map(props.children, function (child) { return (0, jsx_runtime_1.jsx)(SingleChild, { variables: variables, children: child }); });
        }
        return react_1.default.cloneElement(children, newProps);
    }
    return children;
}
function RenderClientVariable(_a) {
    var children = _a.children, variables = _a.variables;
    var renderedChildren = react_1.default.Children.map(children, function (child) { return (0, jsx_runtime_1.jsx)(SingleChild, { variables: variables, children: child }); });
    return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderedChildren });
}
//# sourceMappingURL=RenderClientVariable.js.map