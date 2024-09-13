"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.Currency = exports.Num = exports.Var = exports.getDefaultLocale = exports.getLocale = exports.GTProvider = exports.getGT = void 0;
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
var GTServerProvider_1 = __importDefault(require("./provider/GTServerProvider"));
exports.GTProvider = GTServerProvider_1.default;
var getDefaultLocale = function () {
    (0, getI18NConfig_1.default)().getDefaultLocale();
};
exports.getDefaultLocale = getDefaultLocale;
//# sourceMappingURL=index.server.js.map