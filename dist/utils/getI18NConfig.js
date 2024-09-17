"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
function getI18NConfig() {
    if (!globalThis) {
        throw new Error('Unable to access globalThis.');
    }
    if (!globalThis.__GENERALTRANSLATION__) {
        throw new Error('Unable to access gt-next configuration.');
    }
    return (globalThis === null || globalThis === void 0 ? void 0 : globalThis.__GENERALTRANSLATION__) || (global === null || global === void 0 ? void 0 : global.__GENERALTRANSLATION__);
}
//# sourceMappingURL=getI18NConfig.js.map