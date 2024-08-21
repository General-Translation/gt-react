"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = hasTransformation;
const react_1 = __importDefault(require("react"));
function hasTransformation(entry) {
    if (react_1.default.isValidElement(entry)) {
        const { type } = entry;
        const transformation = typeof type === 'function' ? ((type === null || type === void 0 ? void 0 : type.gtTransformation) || '') : '';
        return transformation ? true : false;
    }
    return false;
}
//# sourceMappingURL=hasTransformation.js.map