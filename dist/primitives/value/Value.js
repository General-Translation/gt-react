"use strict";
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
const jsx_runtime_1 = require("react/jsx-runtime");
require("server-only");
const renderVariable_1 = __importDefault(require("./renderVariable"));
const getValueBranch_1 = __importDefault(require("../helpers/getValueBranch"));
/**
 * Value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {JSX.Element}
 */
const Value = (_a) => {
    var { children, branches, values, locale } = _a, props = __rest(_a, ["children", "branches", "values", "locale"]);
    let { 'data-generaltranslation': generaltranslation } = props;
    if (!values || Object.keys(values).length < 1) {
        console.warn(`WARNING: No values provided to <Value> component with children ${JSON.stringify(children)}.`);
    }
    let branch = ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? (0, getValueBranch_1.default)(values, branches) : null) || children;
    let renderedChildren = (0, renderVariable_1.default)(branch, locale, values ? values : undefined);
    return ((0, jsx_runtime_1.jsx)("span", { "data-values": values, "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
Value.gtTransformation = "value";
exports.default = Value;
//# sourceMappingURL=Value.js.map