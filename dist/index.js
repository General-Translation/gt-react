"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocale = exports.useDefaultLocale = exports.useGT = exports.Branch = exports.Plural = exports.GTProvider = exports.T = exports.DateTime = exports.Currency = exports.Num = exports.Var = void 0;
var T_1 = __importDefault(require("./inline/T"));
exports.T = T_1.default;
var useGT_1 = __importDefault(require("./hooks/useGT"));
exports.useGT = useGT_1.default;
var useDefaultLocale_1 = __importDefault(require("./hooks/useDefaultLocale"));
exports.useDefaultLocale = useDefaultLocale_1.default;
var useLocale_1 = __importDefault(require("./hooks/useLocale"));
exports.useLocale = useLocale_1.default;
var GTProvider_1 = __importDefault(require("./provider/GTProvider"));
exports.GTProvider = GTProvider_1.default;
var Var_1 = __importDefault(require("./variables/Var"));
exports.Var = Var_1.default;
var Num_1 = __importDefault(require("./variables/Num"));
exports.Num = Num_1.default;
var Currency_1 = __importDefault(require("./variables/Currency"));
exports.Currency = Currency_1.default;
var DateTime_1 = __importDefault(require("./variables/DateTime"));
exports.DateTime = DateTime_1.default;
var Plural_1 = __importDefault(require("./branches/plurals/Plural"));
exports.Plural = Plural_1.default;
var Branch_1 = __importDefault(require("./branches/Branch"));
exports.Branch = Branch_1.default;
//# sourceMappingURL=index.js.map