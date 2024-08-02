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
import GTProvider from "./GTProvider";
export default function createGTProviderComponent(_a) {
    var { I18NConfig, I18N, intl } = _a, metadata = __rest(_a, ["I18NConfig", "I18N", "intl"]);
    return (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locale = I18NConfig.getLocale();
        const defaultLocale = I18NConfig.getDefaultLocale();
        /* @ts-expect-error Server Component */
        return _jsx(GTProvider, Object.assign({ locale: locale, defaultLocale: defaultLocale }, metadata, props, { I18NConfig: I18NConfig, I18N: I18N, intl: intl, children: children }));
    };
}
//# sourceMappingURL=createGTProviderComponent.js.map