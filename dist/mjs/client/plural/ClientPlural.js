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
import { jsx as _jsx } from "react/jsx-runtime";
import getPluralBranch from '../../primitives/getPluralBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import createValues from '../../primitives/createValues';
/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientPlural(_a) {
    var { children, n, values, ranges } = _a, branches = __rest(_a, ["children", "n", "values", "ranges"]);
    const locales = [useLocale(), useDefaultLocale()]; // user's language
    return (_jsx(RenderClientVariable, { variables: createValues(n, values), children: ((typeof n === 'number' && Object.assign(Object.assign({}, branches), { ranges })) ? getPluralBranch(n, locales, Object.assign(Object.assign({}, branches), { ranges })) : null) || children }));
}
;
//# sourceMappingURL=ClientPlural.js.map