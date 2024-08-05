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
import InnerValue from "./InnerValue";
export default function createValueComponent({ T, getLocale, defaultLocale }) {
    const Value = (_a) => {
        var { children, values, branches } = _a, props = __rest(_a, ["children", "values", "branches"]);
        const innerProps = { values, branches };
        const locales = [getLocale(), defaultLocale];
        return _jsx(T, Object.assign({}, props, { children: _jsx(InnerValue, Object.assign({ locales: locales }, innerProps, { children: children })) }));
    };
    Value.gtTransformation = "translate-value";
    return Value;
}
//# sourceMappingURL=createValueComponent.js.map