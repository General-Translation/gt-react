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
/**
 * Resolver component to handle async resolution of children.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The children to resolve.
 * @param {ReactNode} props.fallback - The fallback to display on error.
 * @returns {JSX.Element} The resolved children or fallback.
 */
export default function ClientResolver({ promise, fallback }) {
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
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
        return _jsx(_Fragment, { children: fallback });
    }
    return _jsx(_Fragment, { children: resolved });
}
//# sourceMappingURL=ClientResolver.js.map