"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDefaultLocale;
var GTContext_1 = __importDefault(require("../provider/GTContext"));
/**
 * @returns {string} The default locale.
 */
function useDefaultLocale() {
    return (0, GTContext_1.default)("useDefaultLocale(): Unable to access default locale outside of a <GTProvider>").defaultLocale;
}
//# sourceMappingURL=useDefaultLocale.js.map