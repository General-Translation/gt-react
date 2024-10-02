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
var internal_1 = require("../internal");
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
function Plural(_a) {
    var children = _a.children, n = _a.n, branches = __rest(_a, ["children", "n"]);
    var locale = (0, useLocale_1.default)();
    var defaultLocale = (0, useDefaultLocale_1.default)();
    if (typeof n !== 'number')
        throw new Error("Plural with children \"".concat(children, "\" requires \"n\" option."));
    var branch = (0, internal_1.getPluralBranch)(n, [locale, defaultLocale], branches) || children;
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-n": n, "data-gt-branches": branches, children: branch }));
}
Plural.gtTransformation = "plural";
exports.default = Plural;
//# sourceMappingURL=Plural.js.map