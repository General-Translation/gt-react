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
exports.default = createTComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const T_1 = __importDefault(require("./T"));
function createTComponent(_a) {
    var { I18NConfig } = _a, metadata = __rest(_a, ["I18NConfig"]);
    const TComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locale = I18NConfig.getLocale();
        /* @ts-expect-error Server Component */
        return (0, jsx_runtime_1.jsx)(T_1.default, Object.assign({ I18NConfig: I18NConfig, locale: locale }, metadata, props, { children: children }));
    };
    TComponent.gtTransformation = "translate";
    return TComponent;
}
//# sourceMappingURL=createTComponent.js.map