"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var generaltranslation_1 = require("generaltranslation");
var getI18NConfig_1 = __importDefault(require("../utils/getI18NConfig"));
var getLocale_1 = __importDefault(require("../request/getLocale"));
/**
 * The `<Num>` component renders a formatted number string, allowing customization of the name, default value, and formatting options.
 * It formats the number according to the current locale and optionally passed formatting options.
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
 * @param {string|number} [value] - The default value for the number. Can be a string or number. Strings will be parsed to numbers.
 * @param {Intl.NumberFormatOptions} [options={}] - Optional formatting options for the number, following `Intl.NumberFormatOptions` specifications.
 * @returns {JSX.Element} The formatted number component.
 */
function Num(_a) {
    var children = _a.children, _b = _a.name, name = _b === void 0 ? "n" : _b, value = _a.value, _c = _a.options, options = _c === void 0 ? {} : _c, props = __rest(_a, ["children", "name", "value", "options"]);
    var I18NConfig = (0, getI18NConfig_1.default)();
    var locales = [(0, getLocale_1.default)(), I18NConfig.getDefaultLocale()];
    var generaltranslation = props["data-generaltranslation"];
    // Determine the value to be used
    var renderedValue = (typeof children !== 'undefined' && typeof value === 'undefined') ? children : value;
    renderedValue = (typeof renderedValue === 'string') ? parseFloat(renderedValue) : renderedValue;
    // Format the number according to the locale
    var formattedValue = (typeof renderedValue === 'number') ?
        (0, generaltranslation_1.formatNum)({ value: renderedValue, languages: locales, options: options }) :
        renderedValue;
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-_gt-variable-name": name, "data-_gt-variable-type": "number", "data-_gt-variable-options": options, "data-_gt-unformatted-value": typeof renderedValue === 'number' && !isNaN(renderedValue) ? renderedValue : undefined, suppressHydrationWarning: true, children: formattedValue }));
}
;
Num.gtTransformation = "variable-number";
exports.default = Num;
//# sourceMappingURL=Num.js.map