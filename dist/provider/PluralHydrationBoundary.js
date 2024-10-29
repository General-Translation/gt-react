"use strict";
'use client';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
function NoSSRRenderer(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), hasMounted = _b[0], setHasMounted = _b[1];
    (0, react_1.useLayoutEffect)(function () {
        setHasMounted(true);
    }, []);
    return (hasMounted ? children : null);
}
var PluralHydrationBoundary = /** @class */ (function (_super) {
    __extends(PluralHydrationBoundary, _super);
    function PluralHydrationBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    PluralHydrationBoundary.getDerivedStateFromError = function (error) {
        // Only suppress hydration errors from Plural components
        if (error.message.includes('Hydration failed')) {
            return { hasError: true };
        }
        // Let other errors propagate
        throw error;
    };
    PluralHydrationBoundary.prototype.render = function () {
        // If we caught a Plural hydration error, force client-side render
        if (this.state.hasError) {
            return ((0, jsx_runtime_1.jsx)(NoSSRRenderer, { children: this.props.children }));
        }
        return this.props.children;
    };
    return PluralHydrationBoundary;
}(react_1.default.Component));
exports.default = PluralHydrationBoundary;
//# sourceMappingURL=PluralHydrationBoundary.js.map