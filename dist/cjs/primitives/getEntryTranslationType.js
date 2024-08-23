"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEntryTranslationType;
const getEntryMetadata_1 = __importDefault(require("./getEntryMetadata"));
function getEntryTranslationType(entry) {
    const { entry: content, metadata } = (0, getEntryMetadata_1.default)(entry);
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
    if (typeof content === 'string') {
        return "intl";
    }
    return "t";
}
//# sourceMappingURL=getEntryTranslationType.js.map