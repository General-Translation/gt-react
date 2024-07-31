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
function I18NResolver({ children, fallback }) {
    const [resolvedChildren, setResolvedChildren] = (0, react_1.useState)(fallback);
    const [hasError, setHasError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        let abortController = new AbortController();
        const resolveChildren = () => __awaiter(this, void 0, void 0, function* () {
            try {
                if (children instanceof Promise) {
                    const resolved = yield Promise.race([
                        children,
                        new Promise((_, reject) => {
                            abortController.signal.addEventListener('abort', () => reject(new Error('Connection closed')));
                        })
                    ]);
                    if (isMounted) {
                        setResolvedChildren(resolved);
                    }
                }
                else {
                    setResolvedChildren(children);
                }
            }
            catch (error) {
                console.error('Error resolving children:', error);
                if (isMounted) {
                    setHasError(true);
                }
            }
        });
        resolveChildren();
        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [children]);
    if (hasError) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: fallback });
    }
    return ((0, jsx_runtime_1.jsx)(react_2.Suspense, { fallback: fallback, children: resolvedChildren }));
}
//# sourceMappingURL=I18NResolver.js.map