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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getEntryTranslationType;
var getEntryMetadata_1 = __importDefault(require("./getEntryMetadata"));
function getEntryTranslationType(entry) {
    var result = {
        isFunction: false,
        type: "t"
    };
    var _a = (0, getEntryMetadata_1.default)(entry), content = _a.entry, metadata = _a.metadata;
    if (typeof content === 'string') {
        return __assign(__assign({}, result), { type: "string" });
    }
    if (metadata) {
        if (metadata.singular
            || metadata.plural
            || metadata.dual
            || metadata.zero
            || metadata.one
            || metadata.two
            || metadata.few
            || metadata.many
            || metadata.other)
            result.type = "plural";
    }
    if (typeof content === 'function') {
        result = __assign(__assign({}, result), { isFunction: true });
    }
    return result;
}
//# sourceMappingURL=getEntryTranslationType.js.map