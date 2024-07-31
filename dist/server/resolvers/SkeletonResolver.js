"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.default = SkeletonResolver;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_2 = require("react");
/**
 * A function that removes all text from a React component's children.
 * @param {React.ReactNode} children - The children of the component.
 * @returns {React.ReactNode} The children without text nodes.
 */
function removeText(children) {
    return react_1.default.Children.map(children, (child) => {
        if (typeof child === 'string') {
            return null; // Remove text nodes
        }
        if (react_1.default.isValidElement(child)) {
            // Recursively process children
            return react_1.default.cloneElement(child, {}, removeText(child.props.children));
        }
        return child; // Return non-text elements as they are
    });
}
/**
 * I18NResolver component handles the rendering of children which may be a promise.
 * If the promise resolves, the children are rendered inside a Suspense component.
 * If the promise fails, the fallback is rendered permanently.
 *
 * @param {I18NResolverProps} props - The properties for the component.
 * @returns {JSX.Element} - The rendered component.
 */
function SkeletonResolver({ children, fallback }) {
    const [resolvedChildren, setResolvedChildren] = (0, react_1.useState)(removeText(fallback));
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
    return ((0, jsx_runtime_1.jsx)(react_2.Suspense, { fallback: removeText(fallback), children: resolvedChildren }));
}
//# sourceMappingURL=SkeletonResolver.js.map