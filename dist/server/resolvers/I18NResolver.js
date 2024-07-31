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
exports.default = I18NResolver;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("react");
/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 *
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
function I18NResolver({ children, fallback }) {
    const [resolvedChildren, setResolvedChildren] = (0, react_1.useState)(fallback);
    const [hasError, setHasError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        const resolveChildren = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const resolved = yield Promise.resolve(children);
                if (isMounted) {
                    setResolvedChildren(resolved);
                }
            }
            catch (error) {
                console.error(error);
                if (isMounted) {
                    setHasError(true);
                }
            }
        });
        if (children instanceof Promise) {
            resolveChildren();
        }
        else {
            setResolvedChildren(children);
        }
        return () => {
            isMounted = false;
        };
    }, [children]);
    if (hasError) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: fallback });
    }
    return ((0, jsx_runtime_1.jsx)(react_2.Suspense, { fallback: fallback, children: resolvedChildren }));
}
//# sourceMappingURL=I18NResolver.js.map