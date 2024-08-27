"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.default = renderChildren;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const getPluralBranch_1 = __importDefault(require("../../primitives/variables/getPluralBranch"));
const isValidReactNode_1 = __importDefault(require("../../primitives/rendering/isValidReactNode"));
const Var_1 = __importDefault(require("../variables/Var/Var"));
const DateTime_1 = __importDefault(require("../variables/DateTime/DateTime"));
const Num_1 = __importDefault(require("../variables/Num/Num"));
const Currency_1 = __importDefault(require("../variables/Currency/Currency"));
const isTargetVariable_1 = __importDefault(require("../../primitives/variables/isTargetVariable"));
const getVariableProps_1 = __importDefault(require("../../primitives/variables/getVariableProps"));
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
    var _b;
    var { sourceElement, targetElement } = _a, metadata = __rest(_a, ["sourceElement", "targetElement"]);
    const { props } = sourceElement;
    if (props.children) {
        const { 'data-generaltranslation': generaltranslation } = props;
        const targetProps = (targetElement === null || targetElement === void 0 ? void 0 : targetElement.props) || null;
        const targetChildren = targetProps === null || targetProps === void 0 ? void 0 : targetProps.children;
        const targetBranches = (_b = targetProps === null || targetProps === void 0 ? void 0 : targetProps['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.branches;
        // If an alternative branch (from a transformation) is necessary
        if ((generaltranslation === null || generaltranslation === void 0 ? void 0 : generaltranslation.transformation) && targetBranches) {
            const transformation = generaltranslation.transformation;
            // handle number variable branching
            if (transformation === "plural") {
                const { 'data-generaltranslation': generaltranslation, n } = props, branches = __rest(props, ['data-generaltranslation', "n"]); // 'data-generaltranslation' necessary here to fully destructure relevant ...branches
                const sourceBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], branches) || props.children;
                const targetBranch = (0, getPluralBranch_1.default)(n, [metadata.locale, metadata.defaultLocale], targetBranches) || targetChildren;
                const children = renderChildren(Object.assign({ source: sourceBranch, target: targetBranch, variables: Object.assign(Object.assign({}, metadata.variables), { n: n }) }, metadata));
                return react_1.default.createElement('span', {
                    children: children
                });
            }
        }
        // otherwise, just clone the element
        return react_1.default.cloneElement(sourceElement, Object.assign(Object.assign({}, props), { children: renderChildren(Object.assign({ source: props.children, target: targetChildren }, metadata)) }));
    }
    return react_1.default.cloneElement(sourceElement, Object.assign({}, ((sourceElement === null || sourceElement === void 0 ? void 0 : sourceElement.props) || {})));
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
function renderChildren(_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var { source, target } = _a, metadata = __rest(_a, ["source", "target"]);
    // Most straightforward case, return a valid React node
    if ((target === null || typeof target === 'undefined') && (0, isValidReactNode_1.default)(source))
        return source;
    if (typeof target !== null && typeof target !== 'undefined' && (0, isValidReactNode_1.default)(target))
        return target;
    // If target and source are both arrays of children
    if (Array.isArray(source) && Array.isArray(target)) {
        // Filter for variables and valid source children
        let validSourceElements = [];
        for (const sourceChild of source) {
            if ((0, react_1.isValidElement)(sourceChild)) {
                const { props } = sourceChild;
                if (((_b = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.transformation) === "variable") {
                    const { variableName, variableValue, variableOptions } = (0, getVariableProps_1.default)(props);
                    if (variableName && typeof variableValue !== 'undefined' && typeof ((_c = metadata === null || metadata === void 0 ? void 0 : metadata.variables) === null || _c === void 0 ? void 0 : _c[variableName]) === 'undefined') {
                        metadata.variables = Object.assign(Object.assign({}, metadata.variables), { [variableName]: variableValue });
                    }
                    if (variableOptions)
                        metadata.variableOptions = Object.assign(Object.assign({}, metadata.variableOptions), { [variableName]: Object.assign({}, variableOptions) });
                }
                else {
                    validSourceElements.push(sourceChild);
                }
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
            if ((0, isTargetVariable_1.default)(targetChild)) {
                let value;
                const key = targetChild.key;
                if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                    value = metadata.variables[key];
                }
                if (targetChild.variable === "number") {
                    return (0, jsx_runtime_1.jsx)(Num_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_a = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _a === void 0 ? void 0 : _a[key]) }, `num_${index}`);
                }
                if (targetChild.variable === "date") {
                    return (0, jsx_runtime_1.jsx)(DateTime_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_b = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _b === void 0 ? void 0 : _b[key]) }, `date_${index}`);
                }
                if (targetChild.variable === "currency") {
                    return (0, jsx_runtime_1.jsx)(Currency_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, currency: ((_d = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.currency) || undefined, options: Object.assign({}, (_e = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _e === void 0 ? void 0 : _e[key]) }, `currency_${index}`);
                }
                return (0, jsx_runtime_1.jsx)(Var_1.default, { defaultValue: value, name: key }, `var_${index}`);
            }
            // If target is a normal ReactElement
            const matchingSource = findMatchingSource(targetChild);
            if (react_1.default.isValidElement(matchingSource)) {
                return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: renderElement(Object.assign({ sourceElement: matchingSource, targetElement: targetChild }, metadata)) }, `element_${index}`);
            }
        });
    }
    // Target is a single object, could be a component or a variable
    if (typeof target === 'object' && !Array.isArray(target)) {
        const sourceIsValidElement = (0, react_1.isValidElement)(source);
        if (sourceIsValidElement) {
            const { props } = source;
            if (((_d = props === null || props === void 0 ? void 0 : props['data-generaltranslation']) === null || _d === void 0 ? void 0 : _d.transformation) === "variable") {
                const { variableName, variableValue, variableOptions } = (0, getVariableProps_1.default)(props);
                if (variableName && typeof variableValue !== 'undefined' && typeof ((_e = metadata === null || metadata === void 0 ? void 0 : metadata.variables) === null || _e === void 0 ? void 0 : _e[variableName]) === 'undefined') {
                    metadata.variables = Object.assign(Object.assign({}, metadata.variables), { [variableName]: variableValue });
                }
                if (variableOptions)
                    metadata.variableOptions = Object.assign(Object.assign({}, metadata.variableOptions), { [variableName]: Object.assign({}, variableOptions) });
            }
        }
        // if target is a variable
        if ((0, isTargetVariable_1.default)(target)) {
            const key = target.key;
            let value;
            if (metadata.variables && (typeof metadata.variables[key] !== null && typeof metadata.variables[key] !== 'undefined')) {
                value = metadata.variables[key];
            }
            if (target.variable === "number") {
                return (0, jsx_runtime_1.jsx)(Num_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_f = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _f === void 0 ? void 0 : _f[key]) });
            }
            if (target.variable === "date") {
                return (0, jsx_runtime_1.jsx)(DateTime_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, options: Object.assign({}, (_g = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _g === void 0 ? void 0 : _g[key]) });
            }
            if (target.variable === "currency") {
                return (0, jsx_runtime_1.jsx)(Currency_1.default, { locales: [metadata.locale, metadata.defaultLocale], defaultValue: value, name: key, currency: ((_j = (_h = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _h === void 0 ? void 0 : _h[key]) === null || _j === void 0 ? void 0 : _j.currency) || undefined, options: Object.assign({}, (_k = metadata === null || metadata === void 0 ? void 0 : metadata.variableOptions) === null || _k === void 0 ? void 0 : _k[key]) });
            }
            return (0, jsx_runtime_1.jsx)(Var_1.default, { defaultValue: (0, isValidReactNode_1.default)(value) ? value : undefined, name: key });
        }
        // if component
        if (sourceIsValidElement) {
            return renderElement(Object.assign({ sourceElement: source, targetElement: target }, metadata));
        }
    }
}
//# sourceMappingURL=renderChildren.js.map