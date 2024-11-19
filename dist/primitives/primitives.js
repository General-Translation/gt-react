"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAcceptedPluralForm = isAcceptedPluralForm;
var _defaultVariableNames_1 = __importDefault(require("../variables/_defaultVariableNames"));
var primitives = {
    defaultVariableNames: _defaultVariableNames_1.default,
    localeCookieName: "generaltranslation-locale",
    libraryDefaultLocale: "en-US", // language to use as default if none is provided
    pluralForms: ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"],
    defaultCacheURL: "https://cache.gtx.dev",
    defaultDictionary: {},
};
exports.default = primitives;
function isAcceptedPluralForm(form) {
    return primitives.pluralForms.includes(form);
}
//# sourceMappingURL=primitives.js.map