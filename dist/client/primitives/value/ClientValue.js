"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientValue;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const getValueBranch_1 = __importDefault(require("../../../primitives/helpers/getValueBranch"));
const RenderClientVariable_1 = __importDefault(require("./RenderClientVariable"));
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
function ClientValue({ children, branches, values }) {
    const branch = (0, react_1.useMemo)(() => {
        return ((typeof values !== 'undefined' && typeof branches !== 'undefined') ? (0, getValueBranch_1.default)(values, branches) : null) || children;
    }, [values, branches, children]);
    const renderedChildren = (0, react_1.useMemo)(() => {
        return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: values ? values : undefined, children: branch });
    }, [branch, values]);
    return ((0, jsx_runtime_1.jsx)("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map