"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientValue;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const RenderClientVariable_1 = __importDefault(require("./RenderClientVariable"));
const ClientProvider_1 = require("../ClientProvider");
const createValues_1 = __importDefault(require("../../primitives/createValues"));
/**
 * Client-side value variable component that processes the given values and branches,
 * and renders the appropriate content based on the branch logic.
 *
 * @param {any} children - Default children to render if no branches match.
 * @param {Record<string, any>} branches - Object containing conditionally rendered branches.
 * @param {Record<string, any>} ...values - Values to branch and translate around.
 * @returns {ReactNode}
 */
function ClientValue({ children, id, values }) {
    let translate;
    try {
        ({ translate } = (0, ClientProvider_1.useGTContext)());
    }
    catch (_a) {
        throw new Error(`No context provided to <ClientValue> with children: ${children} id: ${id}. Did you mean to import the server component instead?`);
    }
    const defaultTranslation = (0, react_1.useMemo)(() => {
        return translate(id) || children;
    }, [children, id]);
    if (!defaultTranslation) {
        console.warn(`<ClientValue>, with children: ${children} id: ${id} - No translation found.`);
        return children;
    }
    const renderedChildren = (0, react_1.useMemo)(() => {
        return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: (0, createValues_1.default)(undefined, values), children: defaultTranslation });
    }, [defaultTranslation, values]);
    return ((0, jsx_runtime_1.jsx)("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientValue.js.map