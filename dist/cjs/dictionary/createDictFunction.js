"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createDictFunction;
const getEntryMetadata_1 = __importDefault(require("../primitives/getEntryMetadata"));
function createDictFunction(I18NConfig) {
    return (id) => {
        const { entry } = (0, getEntryMetadata_1.default)(I18NConfig.getDictionaryEntry(id));
        return entry;
    };
}
//# sourceMappingURL=createDictFunction.js.map