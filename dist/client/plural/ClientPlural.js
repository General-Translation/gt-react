"use strict";
'use client';
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
var jsx_runtime_1 = require("react/jsx-runtime");
var getPluralBranch_1 = __importDefault(require("../../primitives/variables/getPluralBranch"));
var RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var createValues_1 = __importDefault(require("../../primitives/variables/createValues"));
/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
var ClientPlural = function (_a) {
    var children = _a.children, n = _a.n, values = _a.values, branches = __rest(_a, ["children", "n", "values"]);
    var locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()]; // user's language
    return ((0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: (0, createValues_1.default)(n, values), children: ((typeof n === 'number' && __assign({}, branches)) ? (0, getPluralBranch_1.default)(n, locales, branches) : null) || children }));
};
ClientPlural.gtTransformation = "plural";
exports.default = ClientPlural;
//# sourceMappingURL=ClientPlural.js.map