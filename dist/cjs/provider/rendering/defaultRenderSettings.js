"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRenderSettings = void 0;
exports.defaultRenderSettings = {
    method: "default",
    timeout: (function () {
        var NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : '';
        return NODE_ENV === "development" || NODE_ENV === "test";
    })() ? null : 8000
};
//# sourceMappingURL=defaultRenderSettings.js.map