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
import Numeric from "./InnerNumeric";
export default function createNumericComponent({ T, getLocale, defaultLocale }) {
    const NumericT = (_a) => {
        var { children, n, ranges, zero, one, two, few, many, other, singular, dual, plural } = _a, props = __rest(_a, ["children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
        const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural };
        const locales = [getLocale(), defaultLocale];
        return _jsx(T, Object.assign({}, props, { children: _jsx(Numeric, Object.assign({ locales: locales }, innerProps, { children: children })) }));
    };
    NumericT.gtTransformation = "translate-numeric";
    return NumericT;
}
//# sourceMappingURL=createNumericComponent.js.map