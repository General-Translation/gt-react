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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = renderClientChildren;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var isValidReactNode_1 = __importDefault(require("../../primitives/rendering/isValidReactNode"));
var ClientNum_1 = __importDefault(require("../variables/ClientNum"));
var ClientDateTime_1 = __importDefault(require("../variables/ClientDateTime"));
var ClientCurrency_1 = __importDefault(require("../variables/ClientCurrency"));
var ClientVar_1 = __importDefault(require("../variables/ClientVar"));
var getPluralBranch_1 = __importDefault(require("../../primitives/variables/getPluralBranch"));
var isTargetVariable_1 = __importDefault(require("../../primitives/variables/isTargetVariable"));
var getVariableProps_1 = __importDefault(require("../../primitives/variables/getVariableProps"));
var renderClientElement = function (_a) {
    var _b;
    var sourceElement = _a.sourceElement, targetElement = _a.targetElement, metadata = __rest(_a, ["sourceElement", "targetElement"]);
    var props = sourceElement.props;
    if (props.children) {
        var generaltranslation = props["data-generaltranslation"];
        var targetProps = (targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) || null;
        var targetChildren = targetProps === null || targetProps === void 0 ? void 0 : targetProps.children;
        var targetBranches = (_b = targetProps === null || targetProps === void 0 ? void 0 : targetProps['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.branches;
        // If an alternative branch (from a transformation) is necessary
        if (generaltranslation && generaltranslation.transformation) {
            var transformation = generaltranslation.transformation;
            // handle number variable branching
            if (transformation === "plural") {
                if (!metadata.variables || typeof metadata.variables.n !== 'number') {
                    throw new Error("Plural with id ".concat(metadata.id, " needs n value, e.g. t(\"").concat(metadata.id, "\", { n: 1 })"));
                }
                var n = metadata.variables.n;
                var branches = props['data-unrendered-branches'] || generaltranslation.branches;
                var sourceBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], branches) || generaltranslation.defaultChildren;
                var targetBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;
                var children = renderClientChildren(__assign({ source: sourceBranch, target: targetBranch, variables: __assign(__assign({}, metadata.variables), { n: n }) }, metadata));
                return react_1.default.createElement('span', {
                    children: children
                });
            }
        }
        // otherwise, just clone the element
        return react_1.default.cloneElement(sourceElement, __assign(__assign({}, props), { children: renderClientChildren(__assign({ source: props.children, target: targetChildren }, metadata)) }));
    }
    return react_1.default.cloneElement(sourceElement, __assign({}, ((sourceElement === null || sourceElement === void 0 ? void 0 : sourceElement.props) || {})));
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
function renderClientChildren(_a) {
    var _b, _c, _d, _e;
    var _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    var source = _a.source, target = _a.target, metadata = __rest(_a, ["source", "target"]);
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && (0, isValidReactNode_1.default)(source))
        return source;
    if (typeof target !== null && typeof target !== 'undefined' && (0, isValidReactNode_1.default)(target))
        return target;
    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {
        // Filter for variables and valid source children
        var validSourceElements_1 = [];
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var sourceChild = source_1[_i];
            if (react_1.default.isValidElement(sourceChild)) {
                var props = sourceChild.props;
                if (((_f = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _f === void 0 ? void 0 : _f.transformation) === "variable") {
                    var _r = (0, getVariableProps_1.default)(props), variableName = _r.variableName, variableValue = _r.variableValue, variableOptions = _r.variableOptions;
                    if (variableName && typeof variableValue !== 'undefined' && typeof ((_g = metadata === null || metadata === void 0 ? void 0 : metadata.variables) === null || _g === void 0 ? void 0 : _g[variableName]) === 'undefined') {
                        metadata.variables = __assign(__assign({}, metadata.variables), (_b = {}, _b[variableName] = variableValue, _b));
                    }
                    if (variableOptions)
                        metadata.variableOptions = __assign(__assign({}, metadata.variableOptions), (_c = {}, _c[variableName] = __assign({}, variableOptions), _c));
                }
                else {
                    validSourceElements_1.push(sourceChild);
                }
            }
        }
        // Find matching source elements based on ID
        var findMatchingSource_1 = function (targetElement) {
            return validSourceElements_1.find(function (sourceChild) {
                var _a, _b, _c;
                var props = sourceChild.props;
                if (typeof ((_a = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _a === void 0 ? void 0 : _a.id) !== 'undefined') {
                    var sourceID = props['data-generaltranslation'].id;
                    var targetID = (_c = (_b = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.id;
                    return sourceID === targetID;
                }
                return false;
            });
        };
        // Return targets
        return target.map(function (targetChild, index) {
            var _a, _b, _c, _d, _e;
            // Most straightforward case, return a valid React node
            if ((0, isValidReactNode_1.default)(targetChild)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: targetChild }, "string_".concat(index));
            }
            // if target is a variable
            if ((0, isTargetVariable_1.default)(targetChild)) {
                var key = targetChild.key;
                var value = void 0;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return (0, jsx_runtime_1.jsx)(ClientNum_1.default, { defaultValue: value, name: key, options: __assign({}, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _a === void 0 ? void 0 : _a[key]) }, "num_".concat(index));
                }
                if (targetChild.variable === "date") {
                    return (0, jsx_runtime_1.jsx)(ClientDateTime_1.default, { defaultValue: value, name: key, options: __assign({}, (_b = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _b === void 0 ? void 0 : _b[key]) }, "date_".concat(index));
                }
                if (targetChild.variable === "currency") {
                    return (0, jsx_runtime_1.jsx)(ClientCurrency_1.default, { defaultValue: value, name: key, currency: ((_d = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.currency) || undefined, options: __assign({}, (_e = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _e === void 0 ? void 0 : _e[key]) }, "currency_".concat(index));
                }
                return (0, jsx_runtime_1.jsx)(ClientVar_1.default, { defaultValue: (0, isValidReactNode_1.default)(value) ? value : undefined, name: key }, "var_".concat(index));
            }
            // If target is a normal ReactElement
            var matchingSource = findMatchingSource_1(targetChild);
            if (react_1.default.isValidElement(matchingSource)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderClientElement(__assign({ sourceElement: matchingSource, targetElement: targetChild }, metadata)) }, "element_".concat(index));
            }
        });
    }
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object' && !Array.isArray(target)) {
        var sourceIsValidElement = react_1.default.isValidElement(source);
        if (sourceIsValidElement) {
            var props = source.props;
            if (((_h = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _h === void 0 ? void 0 : _h.transformation) === "variable") {
                var _s = (0, getVariableProps_1.default)(props), variableName = _s.variableName, variableValue = _s.variableValue, variableOptions = _s.variableOptions;
                if (variableName && typeof variableValue !== 'undefined' && typeof ((_j = metadata === null || metadata === void 0 ? void 0 : metadata.variables) === null || _j === void 0 ? void 0 : _j[variableName]) === 'undefined') {
                    metadata.variables = __assign(__assign({}, metadata.variables), (_d = {}, _d[variableName] = variableValue, _d));
                }
                if (variableOptions)
                    metadata.variableOptions = __assign(__assign({}, metadata.variableOptions), (_e = {}, _e[variableName] = __assign({}, variableOptions), _e));
            }
        }
        // if target is a variable
        if ((0, isTargetVariable_1.default)(target)) {
            var key = target.key;
            var value = void 0;
            if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                value = metadata.variables[key];
            }
            if (target.variable === "number") {
                return (0, jsx_runtime_1.jsx)(ClientNum_1.default, { defaultValue: value, name: key, options: __assign({}, (_k = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _k === void 0 ? void 0 : _k[key]) });
            }
            if (target.variable === "date") {
                return (0, jsx_runtime_1.jsx)(ClientDateTime_1.default, { defaultValue: value, name: key, options: __assign({}, (_l = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _l === void 0 ? void 0 : _l[key]) });
            }
            if (target.variable === "currency") {
                return (0, jsx_runtime_1.jsx)(ClientCurrency_1.default, { defaultValue: value, name: key, currency: ((_o = (_m = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _m === void 0 ? void 0 : _m[key]) === null || _o === void 0 ? void 0 : _o.currency) || undefined, options: __assign({}, (_p = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _p === void 0 ? void 0 : _p[key]) });
            }
            return (0, jsx_runtime_1.jsx)(ClientVar_1.default, { defaultValue: (0, isValidReactNode_1.default)(value) ? value : undefined, name: key });
        }
        // if component
        if (sourceIsValidElement) {
            return renderClientElement(__assign({ sourceElement: source, targetElement: target }, metadata));
        }
        // if you happen to be using a ssr dictionary (not advised)
        if (typeof source === 'string' || Array.isArray(source)) {
            return renderClientChildren(__assign({ target: (_q = target === null || target === void 0 ? void 0 : target.props) === null || _q === void 0 ? void 0 : _q.children, source: source }, metadata));
        }
    }
}
//# sourceMappingURL=renderClientChildren.js.map