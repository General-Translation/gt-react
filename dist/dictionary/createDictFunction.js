"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDictFunction;
function createDictFunction(I18NConfig) {
    return (id) => {
        return I18NConfig.getDictionaryEntry(id);
    };
}
//# sourceMappingURL=createDictFunction.js.map