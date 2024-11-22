"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowserLocale = exports.GTContext = void 0;
var GTContext_1 = require("./provider/GTContext");
Object.defineProperty(exports, "GTContext", { enumerable: true, get: function () { return GTContext_1.GTContext; } });
var useBrowserLocale_1 = __importDefault(require("./hooks/useBrowserLocale"));
exports.useBrowserLocale = useBrowserLocale_1.default;
//# sourceMappingURL=client.js.map