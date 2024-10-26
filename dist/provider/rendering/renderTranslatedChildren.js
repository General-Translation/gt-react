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
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import isVariableObject from "../helpers/isVariableObject";
import getGTProp from "../helpers/getGTProp";
import getVariableProps from "../../variables/_getVariableProps";
import { getPluralBranch } from "../../internal";
import renderDefaultChildren from "./renderDefaultChildren";
import renderVariable from "./renderVariable";
import primitives from '../../primitives/primitives';
var libraryDefaultLocale = primitives.libraryDefaultLocale;
function renderTranslatedElement(_a) {
    var _b;
    var sourceElement = _a.sourceElement, targetElement = _a.targetElement, _c = _a.variables, variables = _c === void 0 ? {} : _c, _d = _a.variablesOptions, variablesOptions = _d === void 0 ? {} : _d, _e = _a.locales, locales = _e === void 0 ? [libraryDefaultLocale] : _e;
    var props = sourceElement.props;
    var generaltranslation = props["data-generaltranslation"];
    var transformation = generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation["transformation"];
    if (transformation === "plural") {
        var n = typeof variables.n === 'number' ? variables.n :
            typeof sourceElement.props.n === 'number' ? sourceElement.props.n :
                sourceElement.props['data-_gt-n'];
        var sourceBranches = generaltranslation.branches || {};
        var sourceBranch = getPluralBranch(n, locales, sourceBranches) || sourceElement.props.children;
        var targetBranches = targetElement.props["data-generaltranslation"].branches || {};
        var targetBranch = getPluralBranch(n, locales, targetBranches) || targetElement.props.children;
        return React.createElement('span', __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: sourceBranch,
                target: targetBranch,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    if (transformation === "branch") {
        var name_1 = props.name, branch = props.branch, children = props.children;
        name_1 = name_1 || sourceElement.props['data-_gt-name'] || "branch";
        branch = variables[name_1] || branch || sourceElement.props['data-_gt-branch-name'];
        var sourceBranch = (generaltranslation.branches || {})[branch] || children;
        var targetBranch = (targetElement.props["data-generaltranslation"].branches || {})[branch] || targetElement.props.children;
        return React.createElement('span', __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: sourceBranch,
                target: targetBranch,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    if ((props === null || props === void 0 ? void 0 : props.children) && ((_b = targetElement.props) === null || _b === void 0 ? void 0 : _b.children)) {
        return React.cloneElement(sourceElement, __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: props.children,
                target: targetElement.props.children,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    return sourceElement;
}
export default function renderTranslatedChildren(_a) {
    var source = _a.source, target = _a.target, _b = _a.variables, variables = _b === void 0 ? {} : _b, _c = _a.variablesOptions, variablesOptions = _c === void 0 ? {} : _c, _d = _a.locales, locales = _d === void 0 ? [libraryDefaultLocale] : _d;
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && source)
        return source;
    if (typeof target === 'string')
        return target;
    if (Array.isArray(source) && Array.isArray(target)) {
        var sourceElements_1 = source.filter(function (sourceChild) {
            if (React.isValidElement(sourceChild)) {
                var generaltranslation = getGTProp(sourceChild);
                getVariableProps(sourceChild.props);
                if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                    var _a = getVariableProps(sourceChild.props), variableName = _a.variableName, variableValue = _a.variableValue, variableOptions = _a.variableOptions;
                    if (typeof variables[variableName] === 'undefined') {
                        variables[variableName] = variableValue;
                    }
                    variablesOptions[variableName] = __assign(__assign({}, variablesOptions[variableName]), variableOptions);
                }
                else {
                    return true;
                }
            }
        });
        var findMatchingSourceElement_1 = function (targetElement) {
            return sourceElements_1.find(function (sourceChild) {
                var _a, _b;
                var generaltranslation = getGTProp(sourceChild);
                if (typeof (generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.id) !== 'undefined') {
                    var sourceID = generaltranslation.id;
                    var targetID = (_b = (_a = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) === null || _a === void 0 ? void 0 : _a['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.id;
                    return sourceID === targetID;
                }
                return false;
            });
        };
        return target.map(function (targetChild, index) {
            if (typeof targetChild === 'string')
                return _jsx(React.Fragment, { children: targetChild }, "string_".concat(index));
            if (isVariableObject(targetChild)) {
                return _jsx(React.Fragment, { children: renderVariable({
                        variableType: targetChild.variable || "variable",
                        variableName: targetChild.key,
                        variableValue: variables[targetChild.key],
                        variableOptions: variablesOptions[targetChild.key]
                    }) }, "var_".concat(index));
            }
            var matchingSourceElement = findMatchingSourceElement_1(targetChild);
            if (matchingSourceElement)
                return _jsx(React.Fragment, { children: renderTranslatedElement({
                        sourceElement: matchingSourceElement,
                        targetElement: targetChild,
                        variables: variables,
                        variablesOptions: variablesOptions,
                        locales: locales
                    }) }, "element_".concat(index));
        });
    }
    if (target && typeof target === 'object' && !Array.isArray(target)) {
        var targetType = isVariableObject(target) ? "variable" : "element";
        if (React.isValidElement(source)) {
            if (targetType === "element") {
                return renderTranslatedElement({
                    sourceElement: source, targetElement: target,
                    variables: variables,
                    variablesOptions: variablesOptions,
                    locales: locales
                });
            }
            var generaltranslation = getGTProp(source);
            if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                var _e = getVariableProps(source.props), variableName = _e.variableName, variableValue = _e.variableValue, variableOptions = _e.variableOptions;
                if (typeof variables[variableName] === 'undefined') {
                    variables[variableName] = variableValue;
                }
                variablesOptions[variableName] = __assign(__assign({}, variablesOptions[variableName]), variableOptions);
            }
        }
        if (targetType === "variable") {
            var targetVariable = target;
            return renderVariable({
                variableType: targetVariable.variable || "variable",
                variableName: targetVariable.key,
                variableValue: variables[targetVariable.key],
                variableOptions: variablesOptions[targetVariable.key]
            });
        }
    }
    return renderDefaultChildren({ children: source, variables: variables, variablesOptions: variablesOptions, defaultLocale: locales[0] });
}
//# sourceMappingURL=renderTranslatedChildren.js.map