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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.default = calculateHash;
var xxhash_wasm_1 = __importDefault(require("xxhash-wasm"));
var hashFunctionPromise = (0, xxhash_wasm_1.default)().then(function (hasher) { return hasher.h64ToString; });
var hashFunction = null;
hashFunctionPromise.then(function (fn) {
    hashFunction = fn;
});
/**
 * Calculates a unique ID for the given children objects by hashing their sanitized JSON string representation.
 *
 * @param {any} childrenAsObjects - The children objects to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the unique ID.
 */
function calculateHash(childrenAsObjects) {
    return __awaiter(this, void 0, void 0, function () {
        var unhashedKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!hashFunction) return [3 /*break*/, 2];
                    return [4 /*yield*/, hashFunctionPromise];
                case 1:
                    hashFunction = _a.sent();
                    _a.label = 2;
                case 2:
                    unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
                    return [2 /*return*/, hashFunction(unhashedKey)];
            }
        });
    });
}
function sanitizeChildrenAsObjects(childrenAsObjects) {
    var sanitizeChild = function (child) {
        var _a;
        if (child && typeof child === 'object' && child.props) {
            if ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.children) {
                var type = child.type, rest = __rest(child, ["type"]);
                return __assign(__assign({}, rest), { props: __assign(__assign({}, child.props), { children: sanitizeChildren(child.props.children) }) });
            }
            else {
                var type = child.type, rest = __rest(child, ["type"]);
                return rest;
            }
        }
        return child;
    };
    var sanitizeChildren = function (children) {
        return Array.isArray(children) ? children.map(sanitizeChild) : sanitizeChild(children);
    };
    if (typeof childrenAsObjects === 'object' &&
        childrenAsObjects && childrenAsObjects.t && !childrenAsObjects.type) {
        var result_1 = {};
        Object.entries(childrenAsObjects).forEach(function (_a) {
            var branchName = _a[0], branch = _a[1];
            result_1[branchName] = sanitizeChildren(branch);
        });
        return result_1;
    }
    return sanitizeChildren(childrenAsObjects);
}
//# sourceMappingURL=calculateHash.js.map