"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEntryMetadata;
// Extracts metadata if it has been included in the dictionary
function getEntryMetadata(entry) {
    let metadata;
    if (entry) {
        if (Array.isArray(entry)) {
            if (typeof (entry === null || entry === void 0 ? void 0 : entry[1]) === 'object') {
                metadata = entry[1];
            }
            entry = entry[0];
        }
    }
    return { entry, metadata };
}
//# sourceMappingURL=getEntryMetadata.js.map