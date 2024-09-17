"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
var config_1 = __importDefault(require("next/config"));
function getI18NConfig() {
    var _a, _b;
    var I18NConfig = (_b = (_a = (0, config_1.default)()) === null || _a === void 0 ? void 0 : _a.serverRuntimeConfig) === null || _b === void 0 ? void 0 : _b.__GENERALTRANSLATION__;
    if (!I18NConfig) {
        throw new Error('Unable to access gt-next config. Ensure the plugin is installed correctly!');
    }
    return I18NConfig;
}
//# sourceMappingURL=getI18NConfig.js.map