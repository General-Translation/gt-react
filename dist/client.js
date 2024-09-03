"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowserLocale = exports.Currency = exports.DateTime = exports.Num = exports.Var = exports.useDefaultLocale = exports.useLocale = exports.GTClientProvider = exports.useGT = void 0;
var useDefaultLocale_1 = __importDefault(require("./client/hooks/useDefaultLocale"));
exports.useDefaultLocale = useDefaultLocale_1.default;
var useLocale_1 = __importDefault(require("./client/hooks/useLocale"));
exports.useLocale = useLocale_1.default;
var useGT_1 = __importDefault(require("./client/hooks/useGT"));
exports.useGT = useGT_1.default;
var ClientVar_1 = __importDefault(require("./client/variables/ClientVar"));
exports.Var = ClientVar_1.default;
var ClientNum_1 = __importDefault(require("./client/variables/ClientNum"));
exports.Num = ClientNum_1.default;
var ClientDateTime_1 = __importDefault(require("./client/variables/ClientDateTime"));
exports.DateTime = ClientDateTime_1.default;
var ClientCurrency_1 = __importDefault(require("./client/variables/ClientCurrency"));
exports.Currency = ClientCurrency_1.default;
var GTClientProvider_1 = __importDefault(require("./client/client-only/GTClientProvider"));
exports.GTClientProvider = GTClientProvider_1.default;
var useBrowserLocale_1 = __importDefault(require("./client/hooks/useBrowserLocale"));
exports.useBrowserLocale = useBrowserLocale_1.default;
//# sourceMappingURL=client.js.map