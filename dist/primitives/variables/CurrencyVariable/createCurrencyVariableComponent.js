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
exports.default = createCurrencyVariableComponent;
const jsx_runtime_1 = require("react/jsx-runtime");
const CurrencyVariable_1 = __importDefault(require("./CurrencyVariable"));
function createCurrencyVariableComponent(getLocale) {
    const CurrencyVariableComponent = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const locale = getLocale();
        return (0, jsx_runtime_1.jsx)(CurrencyVariable_1.default, Object.assign({ locale: locale }, props, { children: children }));
    };
    CurrencyVariableComponent.gtTransformation = "variable-currency";
    return CurrencyVariableComponent;
}
//# sourceMappingURL=createCurrencyVariableComponent.js.map