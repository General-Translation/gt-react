import React from "react";
export default function getDictionaryEntry(dictionary, id) {
    if (!id || typeof id !== 'string') {
        throw new Error("Invalid dictionary id: \"".concat(id, "\""));
    }
    ;
    var current = dictionary;
    var dictionaryPath = id.split(".");
    for (var _i = 0, dictionaryPath_1 = dictionaryPath; _i < dictionaryPath_1.length; _i++) {
        var key = dictionaryPath_1[_i];
        if (typeof current !== 'object' || Array.isArray(current) || React.isValidElement(current)) {
            throw new Error("Invalid dictionary id: \"".concat(id, "\""));
        }
        current = current[key];
    }
    return current;
}
//# sourceMappingURL=getDictionaryEntry.js.map