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
import renderVariable from './renderVariable';
import getValueBranch from '../../primitives/getValueBranch';
/**
 * Value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {JSX.Element}
 */
const InnerValue = (_a) => {
    var { children, branches, values, locales } = _a, props = __rest(_a, ["children", "branches", "values", "locales"]);
    let { 'data-generaltranslation': generaltranslation } = props;
    if (!values || Object.keys(values).length < 1) {
        console.warn(`WARNING: No values provided to <Value> component with children ${JSON.stringify(children)}.`);
    }
    let branch = ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? getValueBranch(values, branches) : null) || children;
    let renderedChildren = renderVariable(branch, locales, values ? values : undefined);
    return (_jsx("span", { "data-values": values, "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
InnerValue.gtTransformation = "value";
export default InnerValue;
//# sourceMappingURL=InnerValue.js.map