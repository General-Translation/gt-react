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
var jsx_runtime_1 = require("react/jsx-runtime");
var internal_1 = require("gt-react/internal");
var getLocale_1 = __importDefault(require("../request/getLocale"));
var getI18NConfig_1 = __importDefault(require("../utils/getI18NConfig"));
/**
 * The `<Plural>` component dynamically renders content based on the plural form of the given number (`n`).
 * It determines which content to display by matching the value of `n` to the appropriate pluralization branch,
 * based on the current locale or a default locale. If no matching plural branch is found, the component renders
 * the fallback `children` content.
 *
 * @example
 * ```jsx
 * <Plural n={n} one={<>There is <Num value={n}/> item.</>}>
 *   There are <Num value={n}/> items.
 * </Plural>
 * ```
 * In this example, if `n` is 1, it renders `"There is 1 item"`. If `n` is a different number, it renders
 * `"There are {n} items"`.
 *
 * @param {any} [children] - Fallback content to render if no matching plural branch is found.
 * @param {number} [n] - The number used to determine the plural form. This is required for pluralization to work.
 * @param {object} [branches] - An object containing possible plural branches, typically including `one` for singular
 * and `other` for plural forms, but it may vary depending on the locale.
 * @returns {JSX.Element} The rendered content corresponding to the plural form of `n`, or the fallback content.
 * @throws {Error} If `n` is not provided or not a valid number.
 */
function Plural(_a) {
    var children = _a.children, n = _a.n, props = __rest(_a, ["children", "n"]);
    var generaltranslation = props["data-generaltranslation"], branches = __rest(props, ['data-generaltranslation']);
    var locale = (0, getLocale_1.default)();
    var defaultLocale = (0, getI18NConfig_1.default)().getDefaultLocale();
    var branch = (typeof n === 'number' ? (0, internal_1.getPluralBranch)(n, [locale, defaultLocale], branches) : children) || children;
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-n": n, "data-gt-branches": branches, children: branch }));
}
Plural.gtTransformation = "plural";
exports.default = Plural;
//# sourceMappingURL=Plural.js.map