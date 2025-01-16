import React from "react";
import { createLibraryNoEntryWarning } from "../../errors/createErrors";
export default function getDictionaryEntry(dictionary, id) {
    if (!id || typeof id !== 'string') {
        console.error(createLibraryNoEntryWarning(id));
        return undefined;
    }
    ;
    var current = dictionary;
    var dictionaryPath = id.split(".");
    for (var _i = 0, dictionaryPath_1 = dictionaryPath; _i < dictionaryPath_1.length; _i++) {
        var key = dictionaryPath_1[_i];
        if (typeof current !== 'object' || Array.isArray(current) || React.isValidElement(current)) {
            console.error(createLibraryNoEntryWarning(id));
            return undefined;
        }
        current = current[key];
    }
    return current;
}
//# sourceMappingURL=getDictionaryEntry.js.map