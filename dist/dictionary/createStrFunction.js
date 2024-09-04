"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createStrFunction;
var jsx_runtime_1 = require("react/jsx-runtime");
function createStrFunction(_a) {
    var t = _a.t;
    return function str(id, options) {
        if (options === void 0) { options = {}; }
        var result = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: t(id, options) });
        console.log(JSON.stringify(result));
        return result;
    };
}
//# sourceMappingURL=createStrFunction.js.map