"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = exports.DateTime = exports.Num = exports.Var = exports.ClientPlural = exports.ClientValue = exports.useDefaultLocale = exports.useLocale = exports.GTClientProvider = exports.useGT = void 0;
const useDefaultLocale_1 = __importDefault(require("./client/hooks/useDefaultLocale"));
exports.useDefaultLocale = useDefaultLocale_1.default;
const useLocale_1 = __importDefault(require("./client/hooks/useLocale"));
exports.useLocale = useLocale_1.default;
const useGT_1 = __importDefault(require("./client/hooks/useGT"));
exports.useGT = useGT_1.default;
const ClientValue_1 = __importDefault(require("./client/value/ClientValue"));
exports.ClientValue = ClientValue_1.default;
const ClientPlural_1 = __importDefault(require("./client/plural/ClientPlural"));
exports.ClientPlural = ClientPlural_1.default;
const ClientVar_1 = __importDefault(require("./client/variables/ClientVar"));
exports.Var = ClientVar_1.default;
const ClientNum_1 = __importDefault(require("./client/variables/ClientNum"));
exports.Num = ClientNum_1.default;
const ClientDateTime_1 = __importDefault(require("./client/variables/ClientDateTime"));
exports.DateTime = ClientDateTime_1.default;
const ClientCurrency_1 = __importDefault(require("./client/variables/ClientCurrency"));
exports.Currency = ClientCurrency_1.default;
const GTClientProvider_1 = __importDefault(require("./client/client-only/GTClientProvider"));
exports.GTClientProvider = GTClientProvider_1.default;
//# sourceMappingURL=client.js.map