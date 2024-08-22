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
import renderPlural from '../value/renderVariable';
import getPluralBranch from '../../primitives/getPluralBranch';
import createValues from '../../primitives/createValues';
const Plural = (_a) => {
    var { locales, children, n, ranges, zero, one, two, few, many, other, singular, plural, dual, values } = _a, props = __rest(_a, ["locales", "children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "plural", "dual", "values"]);
    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Plural> component with children ${JSON.stringify(children)}.`);
    }
    const { 'data-generaltranslation': generaltranslation } = props;
    const branches = Object.fromEntries(Object.entries({ ranges, zero, one, two, few, many, other, singular, plural, dual })
        .filter(([_, value]) => value !== undefined));
    const branch = ((typeof n === 'number' && branches) ? getPluralBranch(n, locales, branches) : null) || children;
    const renderedChildren = renderPlural(branch, locales, createValues(n, values));
    return (_jsx("span", { "data-n": n, "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
Plural.gtTransformation = "plural";
export default Plural;
//# sourceMappingURL=InnerPlural.js.map