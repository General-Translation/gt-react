"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getDictionaryEntry;
function getDictionaryEntry(id, dictionary) {
    if (!id || typeof id !== 'string' || !dictionary || typeof dictionary !== 'object')
        return null;
    let current = dictionary;
    let dictionaryPath = id.split(".");
    for (const key of dictionaryPath) {
        current = current === null || current === void 0 ? void 0 : current[key];
    }
    return current;
}
//# sourceMappingURL=getDictionaryEntry.js.map