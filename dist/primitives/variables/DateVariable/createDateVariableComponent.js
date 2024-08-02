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
import DateVariable from "./DateVariable";
export default function createDateVariableComponent(getLocale, defaultLocale) {
    const DateVariableComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locales = [getLocale(), defaultLocale];
        return _jsx(DateVariable, Object.assign({ locales: locales }, props, { children: children }));
    };
    DateVariableComponent.gtTransformation = "variable-date";
    return DateVariableComponent;
}
//# sourceMappingURL=createDateVariableComponent.js.map