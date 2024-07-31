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
exports.default = ClientNumeric;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const getNumericBranch_1 = __importDefault(require("../../../primitives/helpers/getNumericBranch"));
const RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
const useLocale_1 = __importDefault(require("../../hooks/useLocale"));
/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
function ClientNumeric(_a) {
    var { children, n, ranges } = _a, branches = __rest(_a, ["children", "n", "ranges"]);
    const completeBranches = (0, react_1.useMemo)(() => {
        return Object.assign(Object.assign({}, branches), { ranges });
    }, [branches, ranges]);
    const locale = (0, useLocale_1.default)(); // user's language
    const branch = (0, react_1.useMemo)(() => {
        return ((typeof n === 'number' && completeBranches) ? (0, getNumericBranch_1.default)(n, locale, completeBranches) : null) || children;
    }, [n, completeBranches, children, locale]);
    const renderedChildren = (0, react_1.useMemo)(() => {
        return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: (typeof n === 'number') ? { n } : undefined, children: branch });
    }, [n, branch]);
    return ((0, jsx_runtime_1.jsx)("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientNumeric.js.map