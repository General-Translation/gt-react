"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var generaltranslation_1 = require("generaltranslation");
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
/**
 * The `<Num>` component renders a formatted number string, allowing customization of the name, default value, and formatting options.
 * It formats the number according to the current locale and optionally passed formatting options.
 * Must be used inside a `<GTProvider>`.
 *
 * @example
 * ```jsx
 * <Num
 *    name="quantity"
 *    options={{ style: "decimal", maximumFractionDigits: 2 }}
 * >
 *    1000
 * </Num>
 * ```
 *
 * @param {any} [children] - Optional content (typically a number) to render inside the component.
 * @param {string} [name="n"] - Optional name for the number field, used for metadata purposes.
 * @param {string|number} [defaultValue] - The default value for the number. Can be a string or number. Strings will be parsed to numbers.
 * @param {Intl.NumberFormatOptions} [options={}] - Optional formatting options for the number, following `Intl.NumberFormatOptions` specifications.
 * @returns {ReactNode} The formatted number component.
 */
var Num = function (_a) {
    var _b = _a === void 0 ? { name: "n" } : _a, children = _b.children, _c = _b.name, name = _c === void 0 ? "n" : _c, defaultValue = _b.defaultValue, _d = _b.options, options = _d === void 0 ? {} : _d;
    var locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    var value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    if (typeof value === 'number') {
        // Using Intl.NumberFormat for consistent number formatting
        value = (0, generaltranslation_1.formatNum)({ value: value, languages: locales, options: options });
    }
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": JSON.stringify(options), children: value }));
};
Num.gtTransformation = "variable-number";
exports.default = Num;
//# sourceMappingURL=Num.js.map