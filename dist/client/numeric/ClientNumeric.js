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
import { useContext, useMemo } from 'react';
import getNumericBranch from '../../primitives/getNumericBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import { GTContext } from '../ClientProvider';
/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientNumeric(_a) {
    var { children, id, n, ranges } = _a, branches = __rest(_a, ["children", "id", "n", "ranges"]);
    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<Numeric>, with children:\n\n${children}\n\nid:\n\n${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return _jsx(RenderClientVariable, { variables: (typeof n === 'number') ? { n } : undefined, children: children });
    }
    const translation = useMemo(() => { return (ctx === null || ctx === void 0 ? void 0 : ctx.translate(id)) || children; }, [children, id]);
    const completeBranches = useMemo(() => {
        if (!id) {
            return Object.assign(Object.assign({}, branches), { ranges });
        }
        else {
            const t = (innerID) => ctx.translate(`${id}.${innerID}`);
            return {
                zero: t('zero') || branches.zero || undefined,
                one: t('one') || branches.one || undefined,
                two: t('two') || branches.two || undefined,
                few: t('few') || branches.few || undefined,
                many: t('many') || branches.many || undefined,
                other: t('other') || branches.other || undefined,
                singular: t('singular') || branches.singular || undefined,
                dual: t('dual') || branches.dual || undefined,
                plural: t('plural') || branches.plural || undefined,
                ranges: t('ranges') || ranges || undefined,
            };
        }
    }, [branches, ranges, id]);
    const locales = [useLocale(), useDefaultLocale()]; // user's language
    const branch = useMemo(() => {
        return ((typeof n === 'number' && completeBranches) ? getNumericBranch(n, locales, completeBranches) : null) || translation;
    }, [n, completeBranches, translation, locales]);
    const renderedChildren = useMemo(() => {
        return _jsx(RenderClientVariable, { variables: (typeof n === 'number') ? { n } : undefined, children: branch });
    }, [n, branch]);
    return (_jsx("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientNumeric.js.map