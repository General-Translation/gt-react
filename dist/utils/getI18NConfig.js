"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
function getI18NConfig() {
    if (!globalThis && !global) {
        throw new Error('Unable to access globalThis for gt-next.');
    }
    var I18NConfig = (globalThis === null || globalThis === void 0 ? void 0 : globalThis.__GENERALTRANSLATION__) || (global === null || global === void 0 ? void 0 : global.__GENERALTRANSLATION__);
    if (!I18NConfig) {
        throw new Error('Unable to access gt-next configuration.');
    }
    return I18NConfig;
}
//# sourceMappingURL=getI18NConfig.js.map