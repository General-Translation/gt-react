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
import Num from "./Num";
export default function createNumComponent(getLocale, defaultLocale) {
    const NumComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locales = [getLocale(), defaultLocale];
        return _jsx(Num, Object.assign({ locales: locales }, props, { children: children }));
    };
    // Assign a static property to the returned function
    NumComponent.gtTransformation = "variable-number";
    return NumComponent;
}
//# sourceMappingURL=createNumComponent.js.map