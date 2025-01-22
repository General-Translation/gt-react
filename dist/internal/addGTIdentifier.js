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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { isValidElement } from 'react';
import { isAcceptedPluralForm } from 'generaltranslation/internal';
import { createNestedDataGTError, createNestedTError } from '../messages/createMessages';
export default function addGTIdentifier(children, startingIndex) {
    if (startingIndex === void 0) { startingIndex = 0; }
    // Object to keep track of the current index for GT IDs
    var index = startingIndex;
    /**
     * Function to create a GTProp object for a ReactElement
     * @param child - The ReactElement for which the GTProp is created
     * @returns - The GTProp object
     */
    var createGTProp = function (child) {
        var type = child.type, props = child.props;
        index += 1;
        var result = { id: index };
        var transformation;
        try {
            transformation = typeof type === 'function' ? (type.gtTransformation || '') : '';
        }
        catch (error) {
            transformation = '';
        }
        if (transformation) {
            var transformationParts = transformation.split('-');
            if (transformationParts[0] === "translate") {
                throw new Error(createNestedTError(child));
            }
            if (transformationParts[0] === "variable") {
                result.variableType = (transformationParts === null || transformationParts === void 0 ? void 0 : transformationParts[1]) || "variable";
            }
            if (transformationParts[0] === "plural") {
                var pluralBranches = Object.entries(props).reduce(function (acc, _a) {
                    var branchName = _a[0], branch = _a[1];
                    if (isAcceptedPluralForm(branchName)) {
                        acc[branchName] = addGTIdentifier(branch, index);
                    }
                    return acc;
                }, {});
                if (Object.keys(pluralBranches).length)
                    result.branches = pluralBranches;
            }
            if (transformationParts[0] === "branch") {
                var children_1 = props.children, branch = props.branch, branches = __rest(props, ["children", "branch"]);
                var resultBranches = Object.entries(branches).reduce(function (acc, _a) {
                    var branchName = _a[0], branch = _a[1];
                    acc[branchName] = addGTIdentifier(branch, index);
                    return acc;
                }, {});
                if (Object.keys(resultBranches).length)
                    result.branches = resultBranches;
            }
            result.transformation = transformationParts[0];
        }
        return result;
    };
    function handleSingleChildElement(child) {
        var props = child.props;
        if (props['data-_gt'])
            throw new Error(createNestedDataGTError(child));
        // Create new props for the element, including the GT identifier and a key
        var generaltranslation = createGTProp(child);
        var newProps = __assign(__assign({}, props), { 'data-_gt': generaltranslation });
        if (props.children && !generaltranslation.variableType) {
            newProps.children = handleChildren(props.children);
        }
        if (child.type === React.Fragment) {
            var fragment = _jsx("span", __assign({ style: { all: 'unset', display: 'contents' } }, newProps));
            return fragment;
        }
        return React.cloneElement(child, newProps);
    }
    function handleSingleChild(child) {
        if (isValidElement(child)) {
            return handleSingleChildElement(child);
        }
        return child;
    }
    function handleChildren(children) {
        if (Array.isArray(children)) {
            return React.Children.map(children, handleSingleChild);
        }
        else {
            return handleSingleChild(children);
        }
    }
    return handleChildren(children);
}
;
//# sourceMappingURL=addGTIdentifier.js.map