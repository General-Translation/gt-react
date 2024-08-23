"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const useLocale_1 = __importDefault(require("../hooks/useLocale"));
const useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
const ClientDateTime = ({ children, name = "date", defaultValue, options = {} } = { name: "date" }) => {
    const locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()];
    let final;
    let dateValue;
    defaultValue = (typeof children !== 'undefined' && typeof defaultValue === 'undefined') ? children : defaultValue;
    if (!defaultValue)
        return '';
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Unix time in seconds
    }
    else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    }
    else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }
    if (typeof dateValue !== 'undefined') {
        final = (new Intl.DateTimeFormat(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options)).format(dateValue) || (dateValue === null || dateValue === void 0 ? void 0 : dateValue.toLocaleString(locales, Object.assign({ calendar: "gregory", numberingSystem: "latn" }, options))) || '').replace(/[\u200F\u202B\u202E]/g, '');
    }
    // Render the formatted date within a span element
    return ((0, jsx_runtime_1.jsx)("span", { "data-gt-variable-name": name, "data-gt-variable-type": "date", "data-gt-variable-options": options, children: final }));
};
// Static property for transformation type
ClientDateTime.gtTransformation = "variable-date";
exports.default = ClientDateTime;
//# sourceMappingURL=ClientDateTime.js.map