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
const jsx_runtime_1 = require("react/jsx-runtime");
const renderVariable_1 = __importDefault(require("../value/renderVariable"));
const getPluralBranch_1 = __importDefault(require("../../primitives/getPluralBranch"));
const createValues_1 = __importDefault(require("../../primitives/createValues"));
const Plural = (_a) => {
    var { locales, children, n, ranges, zero, one, two, few, many, other, singular, plural, dual, values } = _a, props = __rest(_a, ["locales", "children", "n", "ranges", "zero", "one", "two", "few", "many", "other", "singular", "plural", "dual", "values"]);
    if (typeof n !== 'number') {
        console.warn(`WARNING: No 'n' parameter provided to <Plural> component with children ${JSON.stringify(children)}.`);
    }
    const { 'data-generaltranslation': generaltranslation } = props;
    const branches = Object.fromEntries(Object.entries({ ranges, zero, one, two, few, many, other, singular, plural, dual })
        .filter(([_, value]) => value !== undefined));
    const branch = ((typeof n === 'number' && branches) ? (0, getPluralBranch_1.default)(n, locales, branches) : null) || children;
    const renderedChildren = (0, renderVariable_1.default)(branch, locales, (0, createValues_1.default)(n, values));
    return ((0, jsx_runtime_1.jsx)("span", { "data-unrendered-branches": branches, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
Plural.gtTransformation = "plural";
exports.default = Plural;
//# sourceMappingURL=InnerPlural.js.map