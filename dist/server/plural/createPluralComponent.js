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
exports.default = createPluralComponent;
var jsx_runtime_1 = require("react/jsx-runtime");
var InnerPlural_1 = __importDefault(require("./InnerPlural"));
function createPluralComponent(_a) {
    var T = _a.T, getLocale = _a.getLocale, defaultLocale = _a.defaultLocale;
    var PluralT = function (_a) {
        var children = _a.children, n = _a.n, ranges = _a.ranges, zero = _a.zero, one = _a.one, two = _a.two, few = _a.few, many = _a.many, other = _a.other, singular = _a.singular, dual = _a.dual, plural = _a.plural, values = _a.values, props = __rest(_a, ["children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural", "values"]);
        var innerProps = { n: n, ranges: ranges, zero: zero, one: one, two: two, few: few, many: many, other: other, singular: singular, dual: dual, plural: plural, values: values };
        var locales = [getLocale(), defaultLocale];
        return (0, jsx_runtime_1.jsx)(T, __assign({}, props, { children: (0, jsx_runtime_1.jsx)(InnerPlural_1.default, __assign({ locales: locales }, innerProps, { children: children })) }));
    };
    PluralT.gtTransformation = "translate-plural";
    return PluralT;
}
//# sourceMappingURL=createPluralComponent.js.map