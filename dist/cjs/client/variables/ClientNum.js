"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useLocale_1 = __importDefault(require("../hooks/useLocale"));
const useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
const ClientNum = ({ children, name = "n", defaultValue, options = {} } = { name: "n" }) => {
    const locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    let value = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    value = (typeof value === 'string') ? parseFloat(value) : value;
    if (typeof value === 'number') {
        // Using Intl.NumberFormat for consistent number formatting
        value = new Intl.NumberFormat(locales, Object.assign({ numberingSystem: 'latn' }, options)).format(value);
    }
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "number", "data-gt-variable-options": JSON.stringify(options), children: value }));
};
ClientNum.gtTransformation = "variable-number";
exports.default = ClientNum;
//# sourceMappingURL=ClientNum.js.map