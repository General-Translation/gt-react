"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Var = function (_a) {
    var children = _a.children, name = _a.name, defaultValue = _a.defaultValue;
    var final = typeof children !== 'undefined' ? children : defaultValue;
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "variable", children: final }));
};
Var.gtTransformation = "variable-variable";
exports.default = Var;
//# sourceMappingURL=Var.js.map