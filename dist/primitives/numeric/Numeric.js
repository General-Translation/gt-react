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
exports.default = Numeric;
const jsx_runtime_1 = require("react/jsx-runtime");
require("server-only");
const renderVariable_1 = __importDefault(require("../value/renderVariable"));
const getNumericBranch_1 = __importDefault(require("../helpers/getNumericBranch"));
/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {JSX.Element}
 */
function Numeric(_a) {
    var { children, n, ranges, locale } = _a, branches = __rest(_a, ["children", "n", "ranges", "locale"]);
    if (typeof n !== 'number') {
        console.warn(`WARNING: No values provided to <Numeric> component with children ${JSON.stringify(children)}.`);
    }
    let { 'data-generaltranslation': generaltranslation } = branches, otherParams = __rest(branches, ['data-generaltranslation']);
    branches = Object.assign(Object.assign({}, otherParams), { ranges: ranges });
    let branch = ((typeof n === 'number' && branches) ? (0, getNumericBranch_1.default)(n, locale, branches) : null) || children;
    const renderedChildren = (0, renderVariable_1.default)(branch, locale, (typeof n === 'number') ? { n } : undefined);
    return ((0, jsx_runtime_1.jsx)("span", { "data-n": n, "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
}
;
//# sourceMappingURL=Numeric.js.map