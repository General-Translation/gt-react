// Extracts metadata if it has been included in the dictionary
export default function getEntryMetadata(entry) {
    let content;
    let metadata;
    if (entry) {
        if (Array.isArray(entry)) {
            if (typeof (entry === null || entry === void 0 ? void 0 : entry[1]) === 'object') {
                metadata = entry[1];
            }
            content = entry[0];
        }
    }
    if (!content)
        content = entry;
    return { entry: content, metadata };
}
//# sourceMappingURL=getEntryMetadata.js.map