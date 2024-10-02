"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plural = exports.Branch = exports.DateTime = exports.Currency = exports.Num = exports.Var = exports.getLocale = exports.T = exports.GTProvider = exports.getGT = void 0;
exports.getDefaultLocale = getDefaultLocale;
var Var_1 = __importDefault(require("./variables/Var"));
exports.Var = Var_1.default;
var Num_1 = __importDefault(require("./variables/Num"));
exports.Num = Num_1.default;
var Currency_1 = __importDefault(require("./variables/Currency"));
exports.Currency = Currency_1.default;
var DateTime_1 = __importDefault(require("./variables/DateTime"));
exports.DateTime = DateTime_1.default;
var getI18NConfig_1 = __importDefault(require("./utils/getI18NConfig"));
var getLocale_1 = __importDefault(require("./request/getLocale"));
exports.getLocale = getLocale_1.default;
var getGT_1 = __importDefault(require("./server/getGT"));
exports.getGT = getGT_1.default;
var GTProvider_1 = __importDefault(require("./provider/GTProvider"));
exports.GTProvider = GTProvider_1.default;
var T_1 = __importDefault(require("./server/inline/T"));
exports.T = T_1.default;
var Branch_1 = __importDefault(require("./branches/Branch"));
exports.Branch = Branch_1.default;
var Plural_1 = __importDefault(require("./branches/Plural"));
exports.Plural = Plural_1.default;
/**
 * Gets the application's default locale.
 *
 * If no default locale is specified, it defaults to providing 'en'.
 *
 * @returns {string} The application's default locale, e.g., 'en-US'.
 *
 * @example
 * const locale = useDefaultLocale();
 * console.log(locale); // 'en-US'
*/
function getDefaultLocale() {
    return (0, getI18NConfig_1.default)().getDefaultLocale();
}
//# sourceMappingURL=index.server.js.map