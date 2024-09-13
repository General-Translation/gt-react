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
var Num = function (_a) {
    var children = _a.children, _b = _a.name, name = _b === void 0 ? "n" : _b, defaultValue = _a.defaultValue, _c = _a.options, options = _c === void 0 ? {} : _c, props = __rest(_a, ["children", "name", "defaultValue", "options"]);
    var I18NConfig = (0, getI18NConfig_1.default)();
    var locales = [(0, getLocale_1.default)(), I18NConfig.getDefaultLocale()];
    var generaltranslation = props["data-generaltranslation"];
    // Determine the value to be used
    var value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    // Format the number according to the locale
    var formattedValue = (typeof value === 'number') ? (0, generaltranslation_1.formatNum)({ value: value, languages: locales, options: options }) : defaultValue;
    return ((0, jsx_runtime_1.jsx)("span", { "data-generaltranslation": generaltranslation, "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": options, "data-gt-unformatted-value": value, children: formattedValue }));
};
Num.gtTransformation = "variable-number";
exports.default = Num;
//# sourceMappingURL=Num.js.map