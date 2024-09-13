"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCacheURL = exports.defaultDictionaryName = exports.defaultDictionary = exports.pluralBranchNames = exports.libraryDefaultLocale = exports.localeCookieName = exports.defaultVariableNames = void 0;
var _defaultVariableNames_1 = __importDefault(require("../variables/_defaultVariableNames"));
exports.defaultVariableNames = _defaultVariableNames_1.default;
exports.localeCookieName = "generaltranslation-locale";
exports.libraryDefaultLocale = "en"; // language to use as default if none is provided
exports.pluralBranchNames = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
exports.defaultDictionary = {};
exports.defaultDictionaryName = "default";
exports.defaultCacheURL = "https://cache.gtx.dev";
//# sourceMappingURL=primitives.js.map