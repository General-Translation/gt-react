'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import ClientVariable from '../variables/ClientVariable';
import ClientNumberVariable from '../variables/ClientNumberVariable';
import ClientDateVariable from '../variables/ClientDateVariable';
import ClientCurrencyVariable from '../variables/ClientCurrencyVariable';
import defaultVariableNames from '../../../primitives/helpers/defaultVariableNames';
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
    if (React.isValidElement(children)) {
        const { props, type } = children;
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        if (variables) {
            let value;
            let variableType;
            let name;
            let options;
            if (transformation === null || transformation === void 0 ? void 0 : transformation.startsWith("variable")) {
                variableType = ((_a = transformation.split('-')) === null || _a === void 0 ? void 0 : _a[1]) || "variable";
                name = props.name || defaultVariableNames[variableType];
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
                    return _jsx(ClientNumberVariable, { defaultValue: value, name: name, options: options });
                }
                if (variableType === "date") {
                    return _jsx(ClientDateVariable, { defaultValue: value, name: name, options: options });
                }
                if (variableType === "currency") {
                    const currency = props.currency || 'USD';
                    return _jsx(ClientCurrencyVariable, { defaultValue: value, name: name, currency: currency, options: options });
                }
                return _jsx(ClientVariable, { defaultValue: value, name: name });
            }
        }
        let newProps = Object.assign({}, props);
        if (props === null || props === void 0 ? void 0 : props.children) {
            newProps.children = React.Children.map(props.children, child => _jsx(SingleChild, { variables: variables, children: child }));
        }
        return React.cloneElement(children, newProps);
    }
    return children;
}
export default function RenderClientVariable({ children, variables }) {
    const [renderedChildren, setRenderedChildren] = useState(children);
    useEffect(() => {
        setRenderedChildren(React.Children.map(children, child => _jsx(SingleChild, { variables: variables, children: child })));
    }, [children, variables]);
    return (_jsx(_Fragment, { children: renderedChildren }));
}
//# sourceMappingURL=RenderClientVariable.js.map