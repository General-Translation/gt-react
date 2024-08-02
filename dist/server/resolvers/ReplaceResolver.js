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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Suspense } from 'react';
/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 *
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
export default function ReplaceResolver({ children, fallback }) {
    const [resolvedChildren, setResolvedChildren] = useState(fallback);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
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
        return _jsx(_Fragment, { children: fallback });
    }
    return (_jsx(Suspense, { fallback: fallback, children: resolvedChildren }));
}
//# sourceMappingURL=ReplaceResolver.js.map