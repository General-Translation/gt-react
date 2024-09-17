"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
var I18NConfiguration_1 = __importDefault(require("../config/I18NConfiguration"));
var I18NConfig;
function getI18NConfig() {
    if (I18NConfig)
        return I18NConfig;
    var I18NConfigParams = process.env._GENERALTRANSLATION_I18N_CONFIG_PARAMS;
    if (!I18NConfigParams) {
        throw new Error('Unable to access gt-next configuration.');
    }
    I18NConfig = new I18NConfiguration_1.default(JSON.parse(I18NConfigParams));
    return I18NConfig;
}
//# sourceMappingURL=getI18NConfig.js.map