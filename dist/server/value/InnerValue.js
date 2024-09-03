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
var renderVariable_1 = __importDefault(require("./renderVariable"));
var Value = function (_a) {
    var children = _a.children, values = _a.values, locales = _a.locales, props = __rest(_a, ["children", "values", "locales"]);
    if (!values || !locales)
        return children;
    var generaltranslation = props["data-generaltranslation"];
    var renderedChildren = (0, renderVariable_1.default)(children, locales, values);
    return ((0, jsx_runtime_1.jsx)("span", { "data-values": values, "data-generaltranslation": generaltranslation, children: renderedChildren }));
};
exports.default = Value;
//# sourceMappingURL=InnerValue.js.map