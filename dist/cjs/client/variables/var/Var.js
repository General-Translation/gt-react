"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ClientVar_1 = __importDefault(require("./ClientVar"));
const Var = ({ children, name, defaultValue }) => {
    return (0, jsx_runtime_1.jsx)(ClientVar_1.default, { children: children, name: name, defaultValue: defaultValue });
};
Var.gtTransformation = "variable-variable";
exports.default = Var;
//# sourceMappingURL=Var.js.map