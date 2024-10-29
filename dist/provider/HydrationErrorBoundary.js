"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HydrationErrorBoundary;
function HydrationErrorBoundary(_a) {
    var children = _a.children;
    try {
        return children;
    }
    catch (error) {
        console.error("hello");
        return "Hello";
    }
}
//# sourceMappingURL=HydrationErrorBoundary.js.map