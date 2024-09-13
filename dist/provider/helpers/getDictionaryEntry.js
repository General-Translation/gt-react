"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDictionaryEntry;
var react_1 = __importDefault(require("react"));
function getDictionaryEntry(dictionary, id) {
    if (!id || typeof id !== 'string') {
        throw new Error("Invalid dictionary id: \"".concat(id, "\""));
    }
    ;
    var current = dictionary;
    var dictionaryPath = id.split(".");
    for (var _i = 0, dictionaryPath_1 = dictionaryPath; _i < dictionaryPath_1.length; _i++) {
        var key = dictionaryPath_1[_i];
        if (typeof current !== 'object' || Array.isArray(current) || react_1.default.isValidElement(current)) {
            throw new Error("Invalid dictionary id: \"".concat(id, "\""));
        }
        current = current[key];
    }
    return current;
}
//# sourceMappingURL=getDictionaryEntry.js.map