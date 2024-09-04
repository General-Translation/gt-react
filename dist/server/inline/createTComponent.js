"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsx_runtime_1 = require("react/jsx-runtime");
var T_1 = __importDefault(require("./T"));
function createTComponent(I18NConfig) {
    var TComponent = function (_a) {
        var children = _a.children, props = __rest(_a, ["children"]);
        var locale = I18NConfig.getLocale();
        /* @ts-expect-error Server Component */
        return (0, jsx_runtime_1.jsx)(T_1.default, __assign({ I18NConfig: I18NConfig, locale: locale }, I18NConfig.getDefaultProps("t"), props, { children: children }));
    };
    TComponent.gtTransformation = "translate";
    return TComponent;
}
//# sourceMappingURL=createTComponent.js.map