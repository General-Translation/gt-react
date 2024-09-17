"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
function getI18NConfig() {
    if (!globalThis.__GENERALTRANSLATION__) {
        throw new Error('Unable to access gt-next configuration.');
    }
    return globalThis.__GENERALTRANSLATION__;
}
//# sourceMappingURL=getI18NConfig.js.map