"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RenderClientVariable;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ClientVariable_1 = __importDefault(require("../variables/ClientVariable"));
const ClientNumberVariable_1 = __importDefault(require("../variables/ClientNumberVariable"));
const ClientDateVariable_1 = __importDefault(require("../variables/ClientDateVariable"));
const ClientCurrencyVariable_1 = __importDefault(require("../variables/ClientCurrencyVariable"));
const defaultVariableNames_1 = __importDefault(require("../../../primitives/helpers/defaultVariableNames"));
/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
function SingleChild({ children, variables }) {
    var _a;
    if (!children || typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean')
        return children;
    if (react_1.default.isValidElement(children)) {
        const { props, type } = children;
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        if (variables) {
            let value;
            let variableType;
            let name;
            let options;
            console.log(props);
            if (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable")) {
                variableType = ((_a = transformation.split('-')) === null || _a === void 0 ? void 0 : _a[1]) || "variable";
                name = props.name || defaultVariableNames_1.default[variableType];
                value = variables[name];
                options = (props === null || props === void 0 ? void 0 : props.options) || {};
            }
            else if (props && (props === null || props === void 0 ? void 0 : props['data-gt-variable-type'])) {
                variableType = props['data-gt-variable-type'];
                name = props['data-gt-variable-name'];
                value = variables[name];
                options = props['data-gt-variable-options'];
            }
            if (value !== null && typeof value !== 'undefined') {
                if (variableType === "number") {
                    return (0, jsx_runtime_1.jsx)(ClientNumberVariable_1.default, { defaultValue: value, name: name, options: options });
                }
                if (variableType === "date") {
                    return (0, jsx_runtime_1.jsx)(ClientDateVariable_1.default, { defaultValue: value, name: name, options: options });
                }
                if (variableType === "currency") {
                    const currency = props.currency || 'USD';
                    return (0, jsx_runtime_1.jsx)(ClientCurrencyVariable_1.default, { defaultValue: value, name: name, currency: currency, options: options });
                }
                return (0, jsx_runtime_1.jsx)(ClientVariable_1.default, { defaultValue: value, name: name });
            }
        }
        let newProps = Object.assign({}, props);
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = react_1.default.Children.map(props.children, child => (0, jsx_runtime_1.jsx)(SingleChild, { variables: variables, children: child }));
        }
        return react_1.default.cloneElement(children, newProps);
    }
    return children;
}
function RenderClientVariable({ children, variables }) {
    const [renderedChildren, setRenderedChildren] = (0, react_1.useState)(children);
    (0, react_1.useEffect)(() => {
        setRenderedChildren(react_1.default.Children.map(children, child => (0, jsx_runtime_1.jsx)(SingleChild, { variables: variables, children: child })));
    }, [children, variables]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderedChildren }));
}
//# sourceMappingURL=RenderClientVariable.js.map