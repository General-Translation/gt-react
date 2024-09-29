"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getI18NConfig;
var I18NConfiguration_1 = __importDefault(require("../config/I18NConfiguration"));
var defaultInitGTProps_1 = __importDefault(require("../primitives/defaultInitGTProps"));
var I18NConfig;
function getI18NConfig() {
    if (I18NConfig)
        return I18NConfig;
    var I18NConfigParams = process.env._GENERALTRANSLATION_I18N_CONFIG_PARAMS;
    if (I18NConfigParams) {
        I18NConfig = new I18NConfiguration_1.default(JSON.parse(I18NConfigParams));
    }
    else {
        console.warn('Unable to access gt-next configuration. Using defaults.');
        // Defaults and checks
        var projectID = process.env.GT_PROJECT_ID;
        if (!projectID)
            throw new Error('Project ID missing! Set projectID as GT_PROJECT_ID in the environment or by passing the projectID parameter to initGT(). Find your project ID: www.generaltranslation.com/dashboard.');
        var apiKey = process.env.GT_API_KEY;
        if (!apiKey)
            throw new Error("API key is required for automatic translation! Create an API key: www.generaltranslation.com/dashboard/api-keys. (Or, turn off automatic translation by setting baseURL to an empty string.)");
        I18NConfig = new I18NConfiguration_1.default(__assign(__assign({}, defaultInitGTProps_1.default), { maxConcurrentRequests: defaultInitGTProps_1.default._maxConcurrectRequests, batchInterval: defaultInitGTProps_1.default._batchInterval, apiKey: apiKey, projectID: projectID }));
    }
    return I18NConfig;
}
//# sourceMappingURL=getI18NConfig.js.map