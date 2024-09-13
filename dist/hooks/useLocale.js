"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocale;
var GTContext_1 = __importDefault(require("../provider/GTContext"));
/**
 * @returns {string} The user's locale.
 */
function useLocale() {
    return (0, GTContext_1.default)("useLocale(): Unable to access user's locale outside of a <GTProvider>").locale;
}
//# sourceMappingURL=useLocale.js.map