"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHash = exports.flattenDictionary = exports.writeChildrenAsObjects = exports.addGTIdentifier = exports.determineLocale = void 0;
const determineLocale_1 = __importDefault(require("./index/determineLocale"));
exports.determineLocale = determineLocale_1.default;
const calculateHash_1 = __importDefault(require("./primitives/calculateHash"));
exports.calculateHash = calculateHash_1.default;
const flattenDictionary_1 = __importDefault(require("./primitives/dictionary/flattenDictionary"));
exports.flattenDictionary = flattenDictionary_1.default;
const addGTIdentifier_1 = __importDefault(require("./primitives/translation/addGTIdentifier"));
exports.addGTIdentifier = addGTIdentifier_1.default;
const writeChildrenAsObjects_1 = __importDefault(require("./primitives/translation/writeChildrenAsObjects"));
exports.writeChildrenAsObjects = writeChildrenAsObjects_1.default;
//# sourceMappingURL=index.js.map