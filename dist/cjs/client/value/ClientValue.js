"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const RenderClientVariable_1 = __importDefault(require("./RenderClientVariable"));
const createValues_1 = __importDefault(require("../../primitives/variables/createValues"));
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {ReactNode} children - Default children to render if no branches match.
 * @param {Record<string, any>} values - Values to branch and translate around.
 * @returns {ReactNode}
 */
const ClientValue = ({ children, values }) => {
    return ((0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: (0, createValues_1.default)(undefined, values), children: children }));
};
ClientValue.gtTransformation = "value";
exports.default = ClientValue;
//# sourceMappingURL=ClientValue.js.map