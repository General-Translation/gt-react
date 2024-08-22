"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEntryTranslationType;
const react_1 = __importDefault(require("react"));
const getEntryMetadata_1 = __importDefault(require("./getEntryMetadata"));
function getEntryTranslationType(entry) {
    const { entry: entryContent, metadata } = (0, getEntryMetadata_1.default)(entry);
    if (metadata) {
        if (metadata.singular
            || metadata.plural
            || metadata.dual
            || metadata.zero
            || metadata.one
            || metadata.two
            || metadata.few
            || metadata.many
            || metadata.other)
            return "plural";
    }
    if (!react_1.default.isValidElement(entryContent) && typeof entryContent === 'object') {
        const entryKeys = Object.keys(entryContent);
        if (entryKeys.every(key => ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"].includes(key)))
            return "plural";
        return "t";
    }
    return "t";
}
//# sourceMappingURL=getEntryTranslationType.js.map