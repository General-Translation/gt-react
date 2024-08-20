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
import Value from "../server/value/InnerValue";
import Plural from "../server/plural/InnerPlural";
export default function createTFunction({ I18NConfig, T, intl }) {
    return (id, options) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        // Turn into an async function if the target is a string
        if (typeof entry === 'string')
            return intl(entry, Object.assign({ id }, options));
        // If a plural or value is required
        if (options) {
            const locales = [I18NConfig.getLocale(), I18NConfig.getDefaultLocale()];
            const { n, values, ranges, zero, one, two, few, many, other, singular, dual, plural } = options, tOptions = __rest(options, ["n", "values", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
            if (typeof n === 'number') {
                const innerProps = {
                    n,
                    ranges,
                    zero: zero || (entry === null || entry === void 0 ? void 0 : entry.zero),
                    one: one || (entry === null || entry === void 0 ? void 0 : entry.one),
                    two: two || (entry === null || entry === void 0 ? void 0 : entry.two),
                    few: few || (entry === null || entry === void 0 ? void 0 : entry.few),
                    many: many || (entry === null || entry === void 0 ? void 0 : entry.many),
                    other: other || (entry === null || entry === void 0 ? void 0 : entry.other),
                    singular: singular || (entry === null || entry === void 0 ? void 0 : entry.singular),
                    dual: dual || (entry === null || entry === void 0 ? void 0 : entry.dual),
                    plural: plural || (entry === null || entry === void 0 ? void 0 : entry.plural)
                };
                if (values) {
                    // Plural + Value
                    return (_jsx(T, Object.assign({ id: id }, tOptions, { children: _jsx(Value, { values: values, locales: locales, children: _jsx(Plural, Object.assign({ locales: locales }, innerProps, { children: entry })) }) })));
                }
                else {
                    // Plural only
                    return (_jsx(T, Object.assign({ id: id }, tOptions, { children: _jsx(Plural, Object.assign({ locales: locales }, innerProps, { children: entry })) })));
                }
            }
            else if (values) {
                // Value only
                return (_jsx(T, Object.assign({ id: id }, tOptions, { children: _jsx(Value, { values: values, locales: locales, children: entry }) })));
            }
        }
        // base case, just return T
        return _jsx(T, Object.assign({ id: id }, options, { children: entry }));
    };
}
//# sourceMappingURL=createTFunction.js.map