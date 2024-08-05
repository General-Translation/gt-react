var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import getNumericBranch from '../primitives/getNumericBranch';
import getValueBranch from '../primitives/getValueBranch';
import isValidReactNode from '../primitives/isValidReactNode';
import Var from './variables/Var/Var';
import DateTime from './variables/DateTime/DateTime';
import Num from './variables/Num/Num';
import Currency from './variables/Currency/Currency';
import defaultVariableNames from '../primitives/defaultVariableNames';
/**
 * Renders a React element based on the provided source and target elements.
 * Handles transformation and variable branching if necessary.
 *
 * @param {ReactElement} sourceElement - The original React element to be rendered.
 * @param {TargetElement} targetElement - The target element that may alter the rendering of the source element.
 * @param {Record<string, Source>} variables - An optional set of variables for transformations and branching.
 *
 * @returns {ReactElement} The rendered React element.
 */
const renderElement = (_a) => {
    var _b, _c;
    var { sourceElement, targetElement } = _a, metadata = __rest(_a, ["sourceElement", "targetElement"]);
    const { props } = sourceElement;
    if (((_b = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.transformation) === "private") {
        return sourceElement;
    }
    if (props.children) {
        const { 'data-generaltranslation': generaltranslation } = props;
        const targetProps = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props;
        const targetChildren = targetProps === null || targetProps === void 0 ? void 0 : targetProps.children;
        const targetBranches = (_c = targetProps === null || targetProps === void 0 ? void 0 : targetProps['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.branches;
        // If an alternative branch (from a transformation) is necessary
        if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) && targetBranches) {
            const transformation = generaltranslation.transformation;
            // handle number variable branching
            if (transformation === "numeric") {
                const { 'data-generaltranslation': generaltranslation, n } = props, branches = __rest(props, ['data-generaltranslation', "n"]); // 'data-generaltranslation' necessary here to fully destructure relevant ...branches
                const sourceBranch = getNumericBranch(n, [metadata.locale, metadata.defaultLocale], branches) || props.children;
                const targetBranch = getNumericBranch(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;
                const children = renderChildren(Object.assign({ source: sourceBranch, target: targetBranch, variables: Object.assign(Object.assign({}, metadata.variables), { n: n }) }, metadata));
                return React.createElement('span', Object.assign(Object.assign({}, metadata.renderAttributes), { children: children }));
            }
            // or handle value variable branching
            if (transformation === "value") {
                const { 'data-generaltranslation': generaltranslation, branches } = props, values = __rest(props, ['data-generaltranslation', "branches"]); // 'data-generaltranslation' necessary here to fully destructure relevant ...values
                const sourceBranch = getValueBranch(values, branches) || props.children;
                const targetBranch = getValueBranch(values, targetBranches) || targetChildren;
                const children = renderChildren(Object.assign({ source: sourceBranch, target: targetBranch, variables: Object.assign(Object.assign({}, metadata.variables), values) }, metadata));
                return React.createElement('span', Object.assign(Object.assign({}, metadata.renderAttributes), { children: children }));
            }
        }
        // otherwise, just clone the element
        return React.cloneElement(sourceElement, Object.assign(Object.assign(Object.assign({}, props), metadata.renderAttributes), { children: renderChildren(Object.assign({ source: props.children, target: targetChildren }, metadata)) }));
    }
    return React.cloneElement(sourceElement, Object.assign(Object.assign({}, metadata.renderAttributes), sourceElement === null || sourceElement === void 0 ? void 0 : sourceElement.props));
};
/**
 * Renders children elements based on the provided source and target.
 * Handles transformations and branching for number and value variables.
 *
 * @param {Source} source - The source elements to be rendered.
 * @param {Target} [target] - The target elements that may alter the rendering of the source.
 * @param {Record<string, Source>} [variables] - An optional set of variables for transformations and branching.
 *
 * @returns {ReactNode} The rendered children elements.
 */
export default function renderChildren(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var { source, target } = _a, metadata = __rest(_a, ["source", "target"]);
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && isValidReactNode(source))
        return source;
    // Extremely important due to GTProvider and t() discrepancy on whether to use async intl()
    if (typeof target !== null && typeof target !== 'undefined' && isValidReactNode(target))
        return target;
    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {
        // Filter for variables and valid source children
        let validSourceElements = [];
        for (const sourceChild of source) {
            if (((_c = (_b = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.transformation) === "variable") {
                const variableName = sourceChild.props.name || defaultVariableNames[(_e = (_d = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _d === void 0 ? void 0 : _d['data-generaltranslation']) === null || _e === void 0 ? void 0 : _e.variableType];
                const variableValue = sourceChild.props.defaultValue || sourceChild.props.children;
                if (variableName && variableValue && typeof ((_f = metadata === null || metadata === void 0 ? void 0 : metadata.variables) === null || _f === void 0 ? void 0 : _f[variableName]) === 'undefined') {
                    metadata.variables = Object.assign(Object.assign({}, metadata.variables), { [variableName]: variableValue });
                }
                const variableType = ((_h = (_g = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _g === void 0 ? void 0 : _g['data-generaltranslation']) === null || _h === void 0 ? void 0 : _h.variableType) || "variable";
                if (variableType === "number" || variableType === "currency" || variableType === "date") {
                    const variableOptions = (_j = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _j === void 0 ? void 0 : _j.options;
                    if (variableOptions)
                        metadata.variableOptions = Object.assign(Object.assign({}, metadata.variableOptions), { [variableName]: Object.assign({}, variableOptions) });
                }
                if (variableType === "currency") {
                    const variableCurrency = (_k = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _k === void 0 ? void 0 : _k.currency;
                    if (variableCurrency)
                        metadata.variableOptions = Object.assign(Object.assign({}, metadata.variableOptions), { [variableName]: Object.assign({ currency: variableCurrency }, (_l = metadata.variableOptions) === null || _l === void 0 ? void 0 : _l[variableName]) });
                }
            }
            else if (React.isValidElement(sourceChild)) {
                validSourceElements.push(sourceChild);
            }
        }
        // Find matching source elements based on ID
        const findMatchingSource = (targetElement) => {
            return validSourceElements.find(sourceChild => {
                var _a, _b, _c;
                const { props } = sourceChild;
                if (typeof ((_a = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.id) !== 'undefined') {
                    const sourceID = props['data-generaltranslation'].id;
                    const targetID = (_c = (_b = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.id;
                    return sourceID === targetID;
                }
                return false;
            });
        };
        // Return targets
        return target.map((targetChild, index) => {
            var _a, _b, _c, _d, _e;
            // Most straightforward case, return a valid React node
            if (isValidReactNode(targetChild)) {
                return _jsx(React.Fragment, { children: targetChild }, `string_${index}`);
            }
            // If target is a variable
            if ((targetChild === null || targetChild === void 0 ? void 0 : targetChild.variable) && typeof targetChild.key === 'string') {
                const key = targetChild.key;
                let value;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return _jsx(Num, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _a === void 0 ? void 0 : _a[key]) }, `var_${index}`);
                }
                if (targetChild.variable === "date") {
                    return _jsx(DateTime, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_b = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _b === void 0 ? void 0 : _b[key]) }, `var_${index}`);
                }
                if (targetChild.variable === "currency") {
                    return _jsx(Currency, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, currency: ((_d = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.currency) || undefined, options: Object.assign({}, (_e = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _e === void 0 ? void 0 : _e[key]) }, `var_${index}`);
                }
                return _jsx(Var, { defaultValue: isValidReactNode(value) ? value : undefined, name: key }, `var_${index}`);
            }
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (React.isValidElement(matchingSource)) {
                return _jsx(React.Fragment, { children: renderElement(Object.assign({ sourceElement: matchingSource, targetElement: targetChild }, metadata)) }, `element_${index}`);
            }
        });
    }
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object') {
        if (React.isValidElement(source)) {
            return renderElement(Object.assign({ sourceElement: source, targetElement: target }, metadata));
        }
        if ((target === null || target === void 0 ? void 0 : target.variable) && (target === null || target === void 0 ? void 0 : target.keys) && typeof source === 'object' && source !== null) {
            for (const key of target.keys) {
                if (source.hasOwnProperty(key)) {
                    return source[key];
                }
            }
        }
    }
}
//# sourceMappingURL=renderChildren.js.map