"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCacheURL = exports.defaultDictionaryName = exports.defaultDictionary = exports.pluralForms = exports.libraryDefaultLocale = exports.localeCookieName = exports.defaultVariableNames = void 0;
exports.isAcceptedPluralForm = isAcceptedPluralForm;
var _defaultVariableNames_1 = __importDefault(require("../variables/_defaultVariableNames"));
exports.defaultVariableNames = _defaultVariableNames_1.default;
exports.localeCookieName = "generaltranslation-locale";
exports.libraryDefaultLocale = "en"; // language to use as default if none is provided
exports.pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
function isAcceptedPluralForm(form) {
    return exports.pluralForms.includes(form);
}
exports.defaultDictionary = {};
exports.defaultDictionaryName = "default";
exports.defaultCacheURL = "https://cache.gtx.dev";
//# sourceMappingURL=primitives.js.map