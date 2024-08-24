"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderVariable;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const isValidReactNode_1 = __importDefault(require("../../primitives/rendering/isValidReactNode"));
const Var_1 = __importDefault(require("../variables/Var/Var"));
const Currency_1 = __importDefault(require("../variables/Currency/Currency"));
const Num_1 = __importDefault(require("../variables/Num/Num"));
const DateTime_1 = __importDefault(require("../variables/DateTime/DateTime"));
const defaultVariableNames_1 = __importDefault(require("../../primitives/variables/defaultVariableNames"));
/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
const handleSingleChild = (child, locales, variables) => {
    var _a;
    if (react_1.default.isValidElement(child)) {
        const { props, type } = child;
        // Check if a variable component
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        if (variables && (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable"))) {
            const variableType = ((_a = transformation.split('-')) === null || _a === void 0 ? void 0 : _a[1]) || "variable";
            const name = props.name || defaultVariableNames_1.default[variableType];
            const value = variables[name];
            const options = (props === null || props === void 0 ? void 0 : props.options) || {};
            if (variableType === "number") {
                return (0, jsx_runtime_1.jsx)(Num_1.default, { locales: locales, defaultValue: value, name: name, options: options });
            }
            if (variableType === "date") {
                return (0, jsx_runtime_1.jsx)(DateTime_1.default, { locales: locales, defaultValue: value, name: name, options: options });
            }
            if (variableType === "currency") {
                return (0, jsx_runtime_1.jsx)(Currency_1.default, { locales: locales, defaultValue: value, name: name, options: options });
            }
            return (0, jsx_runtime_1.jsx)(Var_1.default, { defaultValue: value, name: name });
        }
        let newProps = Object.assign({}, props);
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
        return children.map((child, index) => (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: handleSingleChild(child, locales, variables) }, index));
    else
        return handleSingleChild(children, locales, variables);
}
//# sourceMappingURL=renderVariable.js.map