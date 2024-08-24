import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import isValidReactNode from '../../primitives/rendering/isValidReactNode';
import Var from '../variables/Var/Var';
import Currency from '../variables/Currency/Currency';
import Num from '../variables/Num/Num';
import DateTime from '../variables/DateTime/DateTime';
import defaultVariableNames from '../../primitives/variables/defaultVariableNames';
/**
 * Handles a single child element by cloning it with new properties if it is a valid React element,
 * or wrapping it in a React Fragment if it is a valid React node object.
 *
 * @param {any} child - The child element to handle.
 * @returns {any} The handled child element.
 */
const handleSingleChild = (child, locales, variables) => {
    var _a;
    if (React.isValidElement(child)) {
        const { props, type } = child;
        // Check if a variable component
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        if (variables && (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable"))) {
            const variableType = ((_a = transformation.split('-')) === null || _a === void 0 ? void 0 : _a[1]) || "variable";
            const name = props.name || defaultVariableNames[variableType];
            const value = variables[name];
            const options = (props === null || props === void 0 ? void 0 : props.options) || {};
            if (variableType === "number") {
                return _jsx(Num, { locales: locales, defaultValue: value, name: name, options: options });
            }
            if (variableType === "date") {
                return _jsx(DateTime, { locales: locales, defaultValue: value, name: name, options: options });
            }
            if (variableType === "currency") {
                return _jsx(Currency, { locales: locales, defaultValue: value, name: name, options: options });
            }
            return _jsx(Var, { defaultValue: value, name: name });
        }
        let newProps = Object.assign({}, props);
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = renderVariable(props.children, locales, variables);
        }
        return React.cloneElement(child, newProps);
    }
    if (isValidReactNode(child))
        return child;
};
/**
 * Recursively renders a variable structure of children, handling arrays of children and single child elements.
 *
 * @param {any} children - The children elements to render.
 * @param {string} locale - The user's locale.
 * @returns {any} The rendered children elements.
 */
export default function renderVariable(children, locales, variables) {
    if (Array.isArray(children))
        return children.map((child, index) => _jsx(React.Fragment, { children: handleSingleChild(child, locales, variables) }, index));
    else
        return handleSingleChild(children, locales, variables);
}
//# sourceMappingURL=renderVariable.js.map