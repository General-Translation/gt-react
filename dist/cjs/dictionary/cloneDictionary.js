"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cloneDictionary;
const react_1 = __importDefault(require("react"));
const getEntryMetadata_1 = __importDefault(require("../primitives/rendering/getEntryMetadata"));
function cloneDictionary(dictionary) {
    const clonedDictionary = {};
    for (const id of Object.keys(dictionary)) {
        const { entry, metadata } = (0, getEntryMetadata_1.default)(dictionary[id]);
        let clonedEntry = react_1.default.isValidElement(entry) ? react_1.default.cloneElement(entry) : structuredClone(entry);
        if (metadata) {
            let clonedMetadata = structuredClone(metadata);
            clonedDictionary[id] = [clonedEntry, clonedMetadata];
            continue;
        }
        clonedDictionary[id] = clonedEntry;
    }
    return clonedDictionary;
}
//# sourceMappingURL=cloneDictionary.js.map