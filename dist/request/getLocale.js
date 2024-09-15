"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLocale;
var getI18NConfig_1 = __importDefault(require("../utils/getI18NConfig"));
var getNextLocale_1 = require("../next/getNextLocale");
var getLocaleFunction;
/**
 * Gets the user's current locale.
 *
 * @returns {string} The user's locale, e.g., 'en-US'.
 *
 * @example
 * const locale = useLocale();
 * console.log(locale); // 'en-US'
*/
function getLocale() {
    var _a;
    if (getLocaleFunction)
        return getLocaleFunction();
    try {
        var customRequestConfig = require('gt-next/_request');
        var customGetLocale = ((_a = customRequestConfig === null || customRequestConfig === void 0 ? void 0 : customRequestConfig.default) === null || _a === void 0 ? void 0 : _a.getLocale) || customRequestConfig.getLocale;
        var locale = customGetLocale();
        getLocaleFunction = customGetLocale;
        return locale;
    }
    catch (_b) {
        var I18NConfig_1 = (0, getI18NConfig_1.default)();
        getLocaleFunction = function () {
            return (0, getNextLocale_1.getNextLocale)(I18NConfig_1.getDefaultLocale(), I18NConfig_1.getLocales());
        };
        return getLocaleFunction();
    }
    ;
}
//# sourceMappingURL=getLocale.js.map