"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = exports.Currency = exports.Num = exports.Var = exports.getLocale = exports.getDefaultLocale = exports.getGT = void 0;
exports.GTProvider = GTProvider;
var gt_react_1 = require("gt-react");
Object.defineProperty(exports, "getGT", { enumerable: true, get: function () { return gt_react_1.useGT; } });
Object.defineProperty(exports, "getDefaultLocale", { enumerable: true, get: function () { return gt_react_1.useDefaultLocale; } });
Object.defineProperty(exports, "getLocale", { enumerable: true, get: function () { return gt_react_1.useLocale; } });
Object.defineProperty(exports, "Var", { enumerable: true, get: function () { return gt_react_1.Var; } });
Object.defineProperty(exports, "Num", { enumerable: true, get: function () { return gt_react_1.Num; } });
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return gt_react_1.Currency; } });
Object.defineProperty(exports, "DateTime", { enumerable: true, get: function () { return gt_react_1.DateTime; } });
function GTProvider(_a) {
    var children = _a.children, id = _a.id;
    throw new Error("You're attempting to import <GTProvider> on the client. "
        + "Are you sure you want to do this? It's better to import <GTProvider> in a file not marked 'use client' so that it can fetch translations on the server. "
        + "If you really need to put <GTProvider> on the client, import <GTProvider> from 'gt-next/client' (not recommended in server-first apps).");
}
//# sourceMappingURL=index.client.js.map