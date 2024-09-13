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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.Currency = exports.Num = exports.Var = exports.getLocale = exports.getDefaultLocale = exports.getGT = exports.GTProvider = void 0;
var gt_react_1 = require("gt-react");
Object.defineProperty(exports, "getGT", { enumerable: true, get: function () { return gt_react_1.useGT; } });
Object.defineProperty(exports, "getDefaultLocale", { enumerable: true, get: function () { return gt_react_1.useDefaultLocale; } });
Object.defineProperty(exports, "getLocale", { enumerable: true, get: function () { return gt_react_1.useLocale; } });
Object.defineProperty(exports, "Var", { enumerable: true, get: function () { return gt_react_1.Var; } });
Object.defineProperty(exports, "Num", { enumerable: true, get: function () { return gt_react_1.Num; } });
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return gt_react_1.Currency; } });
Object.defineProperty(exports, "DateTime", { enumerable: true, get: function () { return gt_react_1.DateTime; } });
var GTProvider = function (_a) {
    var props = __rest(_a, []);
    throw new Error("You're attempting to import <GTProvider> on the client. "
        + "Are you sure you want to do this? It's better to import <GTProvider> in a file not marked 'use client' so that it can fetch translations on the server. "
        + "If you really need to put <GTProvider> on the client, import <GTClientProvider> from 'gt-next/client'.");
};
exports.GTProvider = GTProvider;
//# sourceMappingURL=index.client.js.map