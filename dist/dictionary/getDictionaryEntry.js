"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDictionaryEntry;
function getDictionaryEntry(id, dictionary) {
    if (!id || typeof id !== 'string' || !dictionary || typeof dictionary !== 'object')
        return null;
    var current = dictionary;
    var dictionaryPath = id.split(".");
    for (var _i = 0, dictionaryPath_1 = dictionaryPath; _i < dictionaryPath_1.length; _i++) {
        var key = dictionaryPath_1[_i];
        current = current === null || current === void 0 ? void 0 : current[key];
    }
    return current;
}
//# sourceMappingURL=getDictionaryEntry.js.map