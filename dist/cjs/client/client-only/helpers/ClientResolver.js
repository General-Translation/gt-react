"use strict";
'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.default = ClientResolver;
const react_1 = require("react");
const renderClientChildren_1 = __importDefault(require("./renderClientChildren"));
function ClientResolver(_a) {
    var { entry, promise, fallback } = _a, metadata = __rest(_a, ["entry", "promise", "fallback"]);
    const [resolved, setResolved] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const resolvePromise = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield promise;
                setResolved(result);
            }
            catch (error) {
                console.log(error);
                setError(true);
            }
        });
        resolvePromise();
    }, [promise]);
    if (error) {
        return (0, renderClientChildren_1.default)({
            source: entry,
            target: fallback,
            metadata
        });
    }
    if (resolved) {
        const c = (0, renderClientChildren_1.default)({
            source: entry,
            target: resolved,
            metadata
        });
    }
    return null;
}
//# sourceMappingURL=ClientResolver.js.map