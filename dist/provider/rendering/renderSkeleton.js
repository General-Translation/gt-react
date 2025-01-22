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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import getGTProp from "../helpers/getGTProp";
import { getPluralBranch } from "../../internal";
import { libraryDefaultLocale } from 'generaltranslation/internal';
function replaceContentWithWhitespace(content) {
    if (typeof content === "number") {
        // Convert number to string and replace each non-whitespace character with a non-breaking space
        return content.toString().replace(/\S/g, '\u00A0');
    }
    else if (typeof content === "string") {
        // Replace each non-whitespace character with a non-breaking space
        return content.replace(/\S/g, '\u00A0');
    }
    // Fallback case (shouldn't be reached due to the type signature)
    return "";
}
/**
 * renderSkeleton is a function that handles the rendering behavior for the skeleton loading method.
 * It replaces all non-whitespace with non-linebreaking spaces.
 * @param children the children react node to be rendered
 * @param variables the variables to be used in the rendering
 * @param variablesOptions the options for the variables
 * @param defaultLocale the default locale to be used
 * @returns
 */
export default function renderSkeleton(_a) {
    var children = _a.children, _b = _a.variables, variables = _b === void 0 ? {} : _b, _c = _a.defaultLocale, defaultLocale = _c === void 0 ? libraryDefaultLocale : _c, renderVariable = _a.renderVariable;
    var handleSingleChildElement = function (child) {
        var generaltranslation = getGTProp(child);
        if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
            return _jsx(_Fragment, {});
        }
        if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "plural") {
            var n = typeof variables.n === 'number' ? variables.n :
                typeof child.props.n === 'number' ? child.props.n :
                    child.props['data-_gt-n'];
            if (typeof n === 'number' && typeof variables.n === 'undefined')
                variables.n = n;
            var branches = generaltranslation.branches || {};
            return handleChildren(getPluralBranch(n, [defaultLocale], branches) || child.props.children);
        }
        if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "branch") {
            var _a = child.props, children_1 = _a.children, name_1 = _a.name, branch = _a.branch, _gt = _a["data-_gt"], branches = __rest(_a, ["children", "name", "branch", 'data-_gt']);
            name_1 = name_1 || child.props['data-_gt-name'] || "branch";
            branch = variables[name_1] || branch || child.props['data-_gt-branch-name'];
            branches = generaltranslation.branches || {};
            return handleChildren(branches[branch] !== undefined ? branches[branch] : children_1);
        }
        if (child.props.children) {
            return React.cloneElement(child, __assign(__assign({}, child.props), { 'data-_gt': undefined, children: handleChildren(child.props.children) }));
        }
        // empty element
        return React.cloneElement(child, __assign(__assign({}, child.props), { 'data-_gt': undefined }));
    };
    var handleSingleChild = function (child) {
        if (React.isValidElement(child)) {
            return handleSingleChildElement(child);
        }
        else if (typeof child === "number" || typeof child === "string") {
            return replaceContentWithWhitespace(child);
        }
        return child;
    };
    var handleChildren = function (children) {
        return Array.isArray(children) ? React.Children.map(children, handleSingleChild) : handleSingleChild(children);
    };
    return handleChildren(children);
}
//# sourceMappingURL=renderSkeleton.js.map