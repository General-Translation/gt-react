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
exports.renderVariable = renderVariable;
exports.default = renderTranslatedChildren;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var Num_1 = __importDefault(require("../../variables/Num"));
var Var_1 = __importDefault(require("../../variables/Var"));
var Currency_1 = __importDefault(require("../../variables/Currency"));
var DateTime_1 = __importDefault(require("../../variables/DateTime"));
var isVariableObject_1 = __importDefault(require("../helpers/isVariableObject"));
var getGTProp_1 = __importDefault(require("../helpers/getGTProp"));
var _getVariableProps_1 = __importDefault(require("../../variables/_getVariableProps"));
var primitives_1 = require("../../primitives/primitives");
var internal_1 = require("../../internal");
function renderVariable(_a) {
    var variableType = _a.variableType, variableName = _a.variableName, variableValue = _a.variableValue, variableOptions = _a.variableOptions;
    if (variableType === "number") {
        return ((0, jsx_runtime_1.jsx)(Num_1.default, { name: variableName, value: variableValue, options: variableOptions }));
    }
    else if (variableType === "datetime") {
        return ((0, jsx_runtime_1.jsx)(DateTime_1.default, { name: variableName, value: variableValue, options: variableOptions }));
    }
    else if (variableType === "currency") {
        return ((0, jsx_runtime_1.jsx)(Currency_1.default, { name: variableName, value: variableValue, options: variableOptions }));
    }
    return ((0, jsx_runtime_1.jsx)(Var_1.default, { name: variableName, value: variableValue }));
}
function renderTranslatedElement(_a) {
    var _b;
    var sourceElement = _a.sourceElement, targetElement = _a.targetElement, _c = _a.variables, variables = _c === void 0 ? {} : _c, _d = _a.variablesOptions, variablesOptions = _d === void 0 ? {} : _d, _e = _a.locales, locales = _e === void 0 ? [primitives_1.libraryDefaultLocale] : _e;
    var props = sourceElement.props;
    var generaltranslation = props["data-generaltranslation"];
    var transformation = generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation["transformation"];
    if (transformation === "plural") {
        var n = typeof variables.n === 'number' ? variables.n :
            typeof sourceElement.props.n === 'number' ? sourceElement.props.n :
                sourceElement.props['data-gt-n'];
        var sourceBranches = generaltranslation.branches || {};
        var sourceBranch = (0, internal_1.getPluralBranch)(n, locales, sourceBranches) || sourceElement.props.children;
        var targetBranches = targetElement.props["data-generaltranslation"].branches || {};
        var targetBranch = (0, internal_1.getPluralBranch)(n, locales, targetBranches) || targetElement.props.children;
        return react_1.default.createElement('span', __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: sourceBranch,
                target: targetBranch,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    if (transformation === "branch") {
        var name_1 = props.name, branch = props.branch, children = props.children;
        name_1 = name_1 || sourceElement.props['data-gt-name'] || "branch";
        branch = variables[name_1] || branch || sourceElement.props['data-gt-branch-name'];
        var sourceBranch = (generaltranslation.branches || {})[branch] || children;
        var targetBranch = (targetElement.props["data-generaltranslation"].branches || {})[branch] || targetElement.props.children;
        return react_1.default.createElement('span', __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: sourceBranch,
                target: targetBranch,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    if ((props === null || props === void 0 ? void 0 : props.children) && ((_b = targetElement.props) === null || _b === void 0 ? void 0 : _b.children)) {
        return react_1.default.cloneElement(sourceElement, __assign(__assign({}, props), { 'data-generaltranslation': undefined, children: renderTranslatedChildren({
                source: props.children,
                target: targetElement.props.children,
                variables: variables,
                variablesOptions: variablesOptions,
                locales: locales
            }) }));
    }
    return sourceElement;
}
function renderTranslatedChildren(_a) {
    var source = _a.source, target = _a.target, _b = _a.variables, variables = _b === void 0 ? {} : _b, _c = _a.variablesOptions, variablesOptions = _c === void 0 ? {} : _c, _d = _a.locales, locales = _d === void 0 ? [primitives_1.libraryDefaultLocale] : _d;
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && source)
        return source;
    if (typeof target === 'string')
        return target;
    if (Array.isArray(source) && Array.isArray(target)) {
        var sourceElements_1 = source.filter(function (sourceChild) {
            if (react_1.default.isValidElement(sourceChild)) {
                var generaltranslation = (0, getGTProp_1.default)(sourceChild);
                (0, _getVariableProps_1.default)(sourceChild.props);
                if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                    var _a = (0, _getVariableProps_1.default)(sourceChild.props), variableName = _a.variableName, variableValue = _a.variableValue, variableOptions = _a.variableOptions;
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
                var generaltranslation = (0, getGTProp_1.default)(sourceChild);
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
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: targetChild }, "string_".concat(index));
            if ((0, isVariableObject_1.default)(targetChild)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderVariable({
                        variableType: targetChild.variable || "variable",
                        variableName: targetChild.key,
                        variableValue: variables[targetChild.key],
                        variableOptions: variablesOptions[targetChild.key]
                    }) }, "var_".concat(index));
            }
            var matchingSourceElement = findMatchingSourceElement_1(targetChild);
            if (matchingSourceElement)
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderTranslatedElement({
                        sourceElement: matchingSourceElement,
                        targetElement: targetChild,
                        variables: variables,
                        variablesOptions: variablesOptions,
                        locales: locales
                    }) }, "element_".concat(index));
        });
    }
    if (target && typeof target === 'object' && !Array.isArray(target)) {
        var targetType = (0, isVariableObject_1.default)(target) ? "variable" : "element";
        if (react_1.default.isValidElement(source)) {
            if (targetType === "element") {
                return renderTranslatedElement({
                    sourceElement: source, targetElement: target,
                    variables: variables,
                    variablesOptions: variablesOptions,
                    locales: locales
                });
            }
            var generaltranslation = (0, getGTProp_1.default)(source);
            if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) === "variable") {
                var _e = (0, _getVariableProps_1.default)(source.props), variableName = _e.variableName, variableValue = _e.variableValue, variableOptions = _e.variableOptions;
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
    // if target can't be rendered by itself and source can't be rendered by itself, there's nothing more to do
    // that's the only scenario in which renderTranslatedChildren reaches this point
}
//# sourceMappingURL=renderTranslatedChildren.js.map