"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGTIdentifier = exports.writeChildrenAsObjects = exports.flattenDictionary = exports.calculateID = void 0;
const calculateID_1 = __importDefault(require("./primitives/calculateID"));
exports.calculateID = calculateID_1.default;
const flattenDictionary_1 = __importDefault(require("./primitives/flattenDictionary"));
exports.flattenDictionary = flattenDictionary_1.default;
const addGTIdentifier_1 = __importDefault(require("./server/helpers/addGTIdentifier"));
exports.addGTIdentifier = addGTIdentifier_1.default;
const writeChildrenAsObjects_1 = __importDefault(require("./server/helpers/writeChildrenAsObjects"));
exports.writeChildrenAsObjects = writeChildrenAsObjects_1.default;
//# sourceMappingURL=index.js.map