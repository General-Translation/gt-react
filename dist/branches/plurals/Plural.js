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
import { getPluralBranch } from "../../internal";
import useLocale from "../../hooks/useLocale";
import useDefaultLocale from "../../hooks/useDefaultLocale";
import { createPluralMissingError } from "../../errors/createErrors";
/**
 * The `<Plural>` component dynamically renders content based on the plural form of the given number (`n`).
 * It determines which content to display by matching the value of `n` to the appropriate pluralization branch,
 * based on the current locale or a default locale. If no matching plural branch is found, the component renders
 * the fallback `children` content.
 *
 * @example
 * ```jsx
 * <Plural n={1} one="There is 1 item">
 *   There are {n} items
 * </Plural>
 * ```
 * In this example, if `n` is 1, it renders `"There is 1 item"`. If `n` is a different number, it renders
 * `"There are {n} items"`.
 *
 * @param {any} [children] - Fallback content to render if no matching plural branch is found.
 * @param {number} [n] - The number used to determine the plural form. This is required for pluralization to work.
 * @returns {JSX.Element} The rendered content corresponding to the plural form of `n`, or the fallback content.
 * @throws {Error} If `n` is not provided or not a valid number.
 */
function Plural(_a) {
    var children = _a.children, n = _a.n, props = __rest(_a, ["children", "n"]);
    var generaltranslation = props["data-_gt"], branches = __rest(props, ['data-_gt']);
    var locale = useLocale();
    var defaultLocale = useDefaultLocale();
    if (typeof n !== 'number')
        throw new Error(createPluralMissingError(children));
    var branch = getPluralBranch(n, [locale, defaultLocale], branches) || children;
    return (_jsx("span", { "data-_gt": generaltranslation, "data-_gt-n": n, style: { display: 'contents' }, children: branch }));
}
Plural.gtTransformation = "plural";
export default Plural;
//# sourceMappingURL=Plural.js.map