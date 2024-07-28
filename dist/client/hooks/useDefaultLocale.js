"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDefaultLocale;
const react_1 = require("react");
const ClientProvider_1 = require("../ClientProvider");
/**
 * @returns {string} The default locale or an empty string if not set.
 */
function useDefaultLocale() {
    const ctx = (0, react_1.useContext)(ClientProvider_1.GTContext);
    if (ctx === null || ctx === void 0 ? void 0 : ctx.defaultLocale) {
        return ctx.defaultLocale;
    }
    return "";
}
//# sourceMappingURL=useDefaultLocale.js.map