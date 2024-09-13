"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowserLocale = exports._GTContext = exports._renderTranslatedChildren = exports._renderDefaultChildren = void 0;
var GTContext_1 = require("./provider/GTContext");
Object.defineProperty(exports, "_GTContext", { enumerable: true, get: function () { return GTContext_1.GTContext; } });
var renderDefaultChildren_1 = __importDefault(require("./provider/rendering/renderDefaultChildren"));
exports._renderDefaultChildren = renderDefaultChildren_1.default;
var renderTranslatedChildren_1 = __importDefault(require("./provider/rendering/renderTranslatedChildren"));
exports._renderTranslatedChildren = renderTranslatedChildren_1.default;
var useBrowserLocale_1 = __importDefault(require("./hooks/useBrowserLocale"));
exports.useBrowserLocale = useBrowserLocale_1.default;
//# sourceMappingURL=client.js.map