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
import T from "./T";
export default function createTComponent(_a) {
    var { I18NConfig } = _a, metadata = __rest(_a, ["I18NConfig"]);
    const TComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locale = I18NConfig.getLocale();
        /* @ts-expect-error Server Component */
        return _jsx(T, Object.assign({ I18NConfig: I18NConfig, locale: locale }, metadata, props, { children: children }));
    };
    TComponent.gtTransformation = "translate";
    return TComponent;
}
//# sourceMappingURL=createTComponent.js.map