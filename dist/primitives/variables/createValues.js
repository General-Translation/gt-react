"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createValues;
function createValues(n, values) {
    if (typeof n !== 'number') {
        if (!values || typeof values !== 'object') {
            return undefined;
        }
        return __assign({}, values);
    }
    if (values && typeof values === 'object') {
        return __assign(__assign({}, values), { n: n });
    }
    return { n: n };
}
//# sourceMappingURL=createValues.js.map