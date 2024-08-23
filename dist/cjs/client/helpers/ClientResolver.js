"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientResolver;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * Resolver component to handle async resolution of children.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The children to resolve.
 * @param {ReactNode} props.fallback - The fallback to display on error.
 * @returns {JSX.Element} The resolved children or fallback.
 */
function ClientResolver({ promise, fallback }) {
    const [resolved, setResolved] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const resolveChildren = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield promise;
                setResolved(result);
            }
            catch (error) {
                console.error(error);
                setError(true);
            }
        });
        resolveChildren();
    }, [promise]);
    if (error) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: fallback });
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: resolved });
}
//# sourceMappingURL=ClientResolver.js.map