"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = calculateID;
const xxhash_wasm_1 = __importDefault(require("xxhash-wasm"));
let hashFunctionPromise = (0, xxhash_wasm_1.default)().then(hasher => hasher.h64ToString);
let hashFunction = null;
hashFunctionPromise.then(fn => {
    hashFunction = fn;
});
function calculateID(childrenAsObjects) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!hashFunction) {
            hashFunction = yield hashFunctionPromise;
        }
        const unhashedKey = JSON.stringify(sanitizeChildrenAsObjects(childrenAsObjects));
        return hashFunction(unhashedKey);
    });
}
function sanitizeChildrenAsObjects(childrenAsObjects) {
    const sanitizeChild = (child) => {
        var _a;
        if (typeof child === 'object' && child.type) {
            if ((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.children) {
                return Object.assign(Object.assign({}, child), { props: Object.assign(Object.assign({}, child.props), { children: sanitizeChildren(child.props.children) }), type: '' });
            }
            else {
                return Object.assign(Object.assign({}, child), { type: '' });
            }
        }
        return child;
    };
    const sanitizeChildren = (children) => {
        return (Array.isArray(children)) ? children.map(sanitizeChild) : sanitizeChild(children);
    };
    return sanitizeChildren(childrenAsObjects);
}
//# sourceMappingURL=calculateID.js.map