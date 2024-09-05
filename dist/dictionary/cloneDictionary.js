"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cloneDictionary;
var react_1 = __importDefault(require("react"));
var getEntryMetadata_1 = __importDefault(require("../primitives/rendering/getEntryMetadata"));
function cloneMetadata(metadata) {
    if (react_1.default.isValidElement(metadata)) {
        return react_1.default.cloneElement(metadata);
    }
    if (typeof metadata !== 'object' || metadata === null) {
        return metadata;
    }
    var clonedObj = {};
    for (var key in metadata) {
        if (metadata.hasOwnProperty(key)) {
            clonedObj[key] = cloneMetadata(metadata[key]);
        }
    }
    return clonedObj;
}
function cloneDictionary(dictionary) {
    var clonedDictionary = {};
    for (var _i = 0, _a = Object.keys(dictionary); _i < _a.length; _i++) {
        var id = _a[_i];
        var _b = (0, getEntryMetadata_1.default)(dictionary[id]), entry = _b.entry, metadata = _b.metadata;
        var clonedEntry = entry;
        if (typeof entry !== 'function') {
            clonedEntry = react_1.default.isValidElement(entry) ? react_1.default.cloneElement(entry) : structuredClone(entry);
        }
        if (metadata) {
            var clonedMetadata = cloneMetadata(metadata);
            clonedDictionary[id] = [clonedEntry, clonedMetadata];
            continue;
        }
        clonedDictionary[id] = clonedEntry;
    }
    return clonedDictionary;
}
//# sourceMappingURL=cloneDictionary.js.map