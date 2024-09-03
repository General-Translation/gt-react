"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEntryMetadata;
var react_1 = require("react");
// Extracts metadata if it has been included in the dictionary
function getEntryMetadata(entry) {
    var content;
    var metadata;
    if (entry) {
        if (Array.isArray(entry) && entry.length === 2 && !(0, react_1.isValidElement)(entry[1]) && typeof entry[1] === 'object') {
            content = entry[0];
            metadata = entry[1];
        }
    }
    if (!content)
        content = entry;
    return { entry: content, metadata: metadata };
}
//# sourceMappingURL=getEntryMetadata.js.map