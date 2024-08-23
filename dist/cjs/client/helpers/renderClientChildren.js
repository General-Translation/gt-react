"use strict";
'use client';
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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const isValidReactNode_1 = __importDefault(require("../../primitives/isValidReactNode"));
const defaultVariableNames_1 = __importDefault(require("../../primitives/defaultVariableNames"));
const ClientNum_1 = __importDefault(require("../variables/ClientNum"));
const ClientDateTime_1 = __importDefault(require("../variables/ClientDateTime"));
const ClientCurrency_1 = __importDefault(require("../variables/ClientCurrency"));
const ClientVar_1 = __importDefault(require("../variables/ClientVar"));
const getPluralBranch_1 = __importDefault(require("../../primitives/getPluralBranch"));
const RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
const renderClientElement = (_a) => {
    var _b;
    var { sourceElement, targetElement } = _a, metadata = __rest(_a, ["sourceElement", "targetElement"]);
    const { props } = sourceElement;
    if (props.children) {
        const { 'data-generaltranslation': generaltranslation } = props;
        const targetProps = targetElement === null || targetElement === void 0 ? void 0 : targetElement.props;
        const targetChildren = targetProps === null || targetProps === void 0 ? void 0 : targetProps.children;
        const targetBranches = (_b = targetProps === null || targetProps === void 0 ? void 0 : targetProps['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.branches;
        // If an alternative branch (from a transformation) is necessary
        if (generaltranslation.transformation) {
            const transformation = generaltranslation.transformation;
            // handle number variable branching
            if (transformation === "plural") {
                if (!metadata.variables || !metadata.variables.n) {
                    throw new Error(`Plural with ${metadata.id} needs n value, e.g. t("${metadata.id}", { n: 1 })`);
                }
                const n = metadata.variables.n;
                const branches = generaltranslation.branches;
                const sourceBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], branches) || generaltranslation.defaultChildren;
                const targetBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;
                const children = renderClientChildren(Object.assign({ source: sourceBranch, target: targetBranch, variables: Object.assign(Object.assign({}, metadata.variables), { n: n }) }, metadata));
                return react_1.default.createElement('span', Object.assign(Object.assign({}, metadata.renderAttributes), { children: children }));
            }
            else if (transformation === "variable") {
                const variableName = props['data-gt-variable-name'];
                if (!metadata.variables || typeof metadata.variables !== 'object' || !metadata.variables[variableName]) {
                    throw new Error(`Variable with ID "${metadata.id}" requires ${variableName} value.\n\ne.g. t("${metadata.id}", { values: { ${variableName}: /* some value */ } })`);
                }
                return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: metadata.variables, children: sourceElement });
            }
        }
        // otherwise, just clone the element
        return react_1.default.cloneElement(sourceElement, Object.assign(Object.assign(Object.assign({}, props), metadata.renderAttributes), { children: renderClientChildren(Object.assign({ source: props.children, target: targetChildren }, metadata)) }));
    }
    return react_1.default.cloneElement(sourceElement, Object.assign(Object.assign({}, metadata.renderAttributes), sourceElement === null || sourceElement === void 0 ? void 0 : sourceElement.props));
};
function renderClientChildren(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var { source, target } = _a, metadata = __rest(_a, ["source", "target"]);
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && (0, isValidReactNode_1.default)(source))
        return source;
    // Extremely important due to GTProvider and t() discrepancy on whether to use async intl()
    if (typeof target !== null && typeof target !== 'undefined' && (0, isValidReactNode_1.default)(target))
        return target;
    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {
        // Filter for variables and valid source children
        let validSourceElements = [];
        for (const sourceChild of source) {
            if (((_c = (_b = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.transformation) === "variable") {
                const variableName = sourceChild.props.name || defaultVariableNames_1.default[(_e = (_d = sourceChild === null || sourceChild === void 0 ? void 0 : sourceChild.props) === null || _d === void 0 ? void 0 : _d['data-generaltranslation']) === null || _e === void 0 ? void 0 : _e.variableType];
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
            else if (react_1.default.isValidElement(sourceChild)) {
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
            if ((0, isValidReactNode_1.default)(targetChild)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: targetChild }, `string_${index}`);
            }
            // If target is a variable
            if ((targetChild === null || targetChild === void 0 ? void 0 : targetChild.variable) && typeof targetChild.key === 'string') {
                const key = targetChild.key;
                let value;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return (0, jsx_runtime_1.jsx)(ClientNum_1.default, { defaultValue: value, name: key, options: Object.assign({}, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _a === void 0 ? void 0 : _a[key]) }, `var_${index}`);
                }
                if (targetChild.variable === "date") {
                    return (0, jsx_runtime_1.jsx)(ClientDateTime_1.default, { defaultValue: value, name: key, options: Object.assign({}, (_b = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _b === void 0 ? void 0 : _b[key]) }, `var_${index}`);
                }
                if (targetChild.variable === "currency") {
                    return (0, jsx_runtime_1.jsx)(ClientCurrency_1.default, { defaultValue: value, name: key, currency: ((_d = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.currency) || undefined, options: Object.assign({}, (_e = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _e === void 0 ? void 0 : _e[key]) }, `var_${index}`);
                }
                return (0, jsx_runtime_1.jsx)(ClientVar_1.default, { defaultValue: (0, isValidReactNode_1.default)(value) ? value : undefined, name: key }, `var_${index}`);
            }
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (react_1.default.isValidElement(matchingSource)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderClientElement(Object.assign({ sourceElement: matchingSource, targetElement: targetChild }, metadata)) }, `element_${index}`);
            }
        });
    }
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object') {
        if (react_1.default.isValidElement(source)) {
            return renderClientElement(Object.assign({ sourceElement: source, targetElement: target }, metadata));
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
//# sourceMappingURL=renderClientChildren.js.map