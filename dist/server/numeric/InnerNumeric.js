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
import renderNumeric from '../value/renderVariable';
import getNumericBranch from '../../primitives/getNumericBranch';
/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {JSX.Element}
 */
const Numeric = (_a) => {
    var { children, n, ranges, locales } = _a, branches = __rest(_a, ["children", "n", "ranges", "locales"]);
    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Numeric> component with children ${JSON.stringify(children)}.`);
    }
    let { 'data-generaltranslation': generaltranslation } = branches, otherParams = __rest(branches, ['data-generaltranslation']);
    branches = Object.assign(Object.assign({}, otherParams), { ranges: ranges });
    let branch = ((typeof n === 'number' && branches) ? getNumericBranch(n, locales, branches) : null) || children;
    const renderedChildren = renderNumeric(branch, locales, (typeof n === 'number') ? { n } : undefined);
    return (_jsx("span", { "data-n": n, "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
Numeric.gtTransformation = "numeric";
export default Numeric;
//# sourceMappingURL=InnerNumeric.js.map