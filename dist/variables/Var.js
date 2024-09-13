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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Var = function (_a) {
    var children = _a.children, _b = _a.name, name = _b === void 0 ? "value" : _b, defaultValue = _a.defaultValue, props = __rest(_a, ["children", "name", "defaultValue"]);
    var generaltranslation = props["data-generaltranslation"];
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined')
        defaultValue = children;
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "variable", "data-gt-unformatted-value": defaultValue, children: defaultValue }));
};
Var.gtTransformation = "variable-variable"; // keep this because Var is imported in other functions
exports.default = Var;
//# sourceMappingURL=Var.js.map