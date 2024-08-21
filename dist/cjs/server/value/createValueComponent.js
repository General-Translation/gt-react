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
exports.default = createValueComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const InnerValue_1 = __importDefault(require("./InnerValue"));
function createValueComponent({ T, getLocale, defaultLocale }) {
    const ValueT = (_a) => {
        var { children, values } = _a, props = __rest(_a, ["children", "values"]);
        const locales = [getLocale(), defaultLocale];
        return (0, jsx_runtime_1.jsx)(T, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(InnerValue_1.default, { locales: locales, values: values, children: children }) }));
    };
    ValueT.gtTransformation = "translate-value";
    return ValueT;
}
//# sourceMappingURL=createValueComponent.js.map