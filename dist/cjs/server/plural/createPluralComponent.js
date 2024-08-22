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
exports.default = createPluralComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const InnerPlural_1 = __importDefault(require("./InnerPlural"));
function createPluralComponent({ T, getLocale, defaultLocale }) {
    const PluralT = (_a) => {
        var { children, n, ranges, zero, one, two, few, many, other, singular, dual, plural, values } = _a, props = __rest(_a, ["children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural", "values"]);
        const innerProps = { n, ranges, zero, one, two, few, many, other, singular, dual, plural, values };
        const locales = [getLocale(), defaultLocale];
        return (0, jsx_runtime_1.jsx)(T, Object.assign({}, props, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, Object.assign({ locales: locales }, innerProps, { children: children })) }));
    };
    PluralT.gtTransformation = "translate-plural";
    return PluralT;
}
//# sourceMappingURL=createPluralComponent.js.map