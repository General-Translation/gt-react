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
var jsx_runtime_1 = require("react/jsx-runtime");
var renderVariable_1 = __importDefault(require("../value/renderVariable"));
var getPluralBranch_1 = __importDefault(require("../../primitives/variables/getPluralBranch"));
var createValues_1 = __importDefault(require("../../primitives/variables/createValues"));
var Plural = function (_a) {
    var locales = _a.locales, children = _a.children, n = _a.n, ranges = _a.ranges, zero = _a.zero, one = _a.one, two = _a.two, few = _a.few, many = _a.many, other = _a.other, singular = _a.singular, plural = _a.plural, dual = _a.dual, values = _a.values, props = __rest(_a, ["locales", "children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "plural", "dual", "values"]);
    if (typeof n !== 'number') {
        console.warn("WARNING: No 'n' parameter provided to <Plural> component with children ".concat(JSON.stringify(children), "."));
    }
    var generaltranslation = props["data-generaltranslation"];
    var branches = Object.fromEntries(Object.entries({ ranges: ranges, zero: zero, one: one, two: two, few: few, many: many, other: other, singular: singular, plural: plural, dual: dual })
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value !== undefined;
    }));
    var branch = ((typeof n === 'number' && branches) ? (0, getPluralBranch_1.default)(n, locales, branches) : null) || children;
    var renderedChildren = (0, renderVariable_1.default)(branch, locales, (0, createValues_1.default)(n, values));
    return ((0, jsx_runtime_1.jsx)("span", { "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
Plural.gtTransformation = "plural";
exports.default = Plural;
//# sourceMappingURL=InnerPlural.js.map