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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createTranslateFunction;
var generaltranslation_1 = require("generaltranslation");
var calculateHash_1 = __importDefault(require("../../internal/calculateHash"));
// translate('Hello')
function createTranslateFunction(I18NConfig) {
    return function (content_1) {
        return __awaiter(this, arguments, void 0, function (content, options, variables, variableOptions) {
            var contentAsArray, key, _a, translation, translationPromise, renderSettings, translation;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contentAsArray = (0, generaltranslation_1.splitStringToContent)(content);
                        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
                        if (!I18NConfig.translationRequired(options.targetLanguage))
                            return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                        if (!options.context) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, calculateHash_1.default)([content, options.context])];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, (0, calculateHash_1.default)(content)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        key = _a;
                        if (!options.id) return [3 /*break*/, 6];
                        return [4 /*yield*/, I18NConfig.getTranslation(options.targetLanguage, key, options.id, options.dictionaryName)];
                    case 5:
                        translation = _b.sent();
                        if (translation)
                            return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                        _b.label = 6;
                    case 6:
                        if (!I18NConfig.automaticTranslationEnabled()) return [3 /*break*/, 8];
                        translationPromise = I18NConfig.translate({ content: content, targetLanguage: options.targetLanguage, options: __assign(__assign({}, options), { hash: key }) });
                        renderSettings = I18NConfig.getRenderSettings();
                        if (!(renderSettings.method !== "subtle" && options.id)) return [3 /*break*/, 8];
                        return [4 /*yield*/, translationPromise];
                    case 7:
                        translation = _b.sent();
                        return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                    case 8: return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                }
            });
        });
    };
}
//# sourceMappingURL=createTranslateFunction.js.map