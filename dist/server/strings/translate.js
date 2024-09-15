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
exports.default = translate;
var generaltranslation_1 = require("generaltranslation");
var getI18NConfig_1 = __importDefault(require("../../utils/getI18NConfig"));
var internal_1 = require("gt-react/internal");
var getLocale_1 = __importDefault(require("../../request/getLocale"));
var getMetadata_1 = __importDefault(require("../../request/getMetadata"));
/**
 * Translates the provided content string based on the specified language and options.
 * If no translation is required, it renders the content as is. Otherwise, it fetches the
 * required translations or falls back to on-demand translation if enabled.
 *
 * By default, General Translation saves the translation in a remote cache if an `id` option is passed.
 *
 * @async
 * @function translate
 *
 * @param {string} content - The content string that needs to be translated.
 * @param {Object} [options] - Translation options.
 * @param {string} [options.id] - A unique identifier for the content, used for caching and fetching translations.
 * @param {string} [options.language] - The target language for translation. Defaults to the current locale if not provided.
 * @param {string} [options.context] - Additional context for the translation process, which may influence the translation's outcome.
 * @param {Object} [options.dictionaryName] - Optional dictionary name for fetching translations from a specific dictionary.
 * @param {Object} [variables] - An optional map of variables to be injected into the translated content.
 * @param {Object} [variableOptions] - Options for formatting numbers and dates using `Intl.NumberFormat` or `Intl.DateTimeFormat`.
 *
 * @returns {Promise<string>} - A promise that resolves to the translated content string, or the original content if no translation is needed.
 *
 * @throws {Error} - Throws an error if the translation process fails or if there are issues with fetching necessary data.
 *
 * @example
 * // Basic usage with default locale detection
 * const translation = await translate("Hello, world!");
 *
 * @example
 * // Providing specific translation options
 * const translation = await translate("Hello, world!", { language: 'es', context: 'Translate informally' });
 *
 * @example
 * // Using variables in the content string
 * const translation = await translate("The price is {price}", {}, { price: 29.99 });
 */
function translate(content_1) {
    return __awaiter(this, arguments, void 0, function (content, options, variables, variableOptions) {
        var I18NConfig, contentAsArray, key, _a, translations, translationPromise, renderSettings, translation;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!content)
                        return [2 /*return*/, ''];
                    I18NConfig = (0, getI18NConfig_1.default)();
                    contentAsArray = (0, generaltranslation_1.splitStringToContent)(content);
                    options.language = options.language || (0, getLocale_1.default)();
                    if (!I18NConfig.translationRequired(options.language))
                        return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(contentAsArray, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                    if (!options.id) return [3 /*break*/, 6];
                    if (!options.context) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, internal_1.calculateHash)([content, options.context])];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, internal_1.calculateHash)(content)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    key = _a;
                    return [4 /*yield*/, I18NConfig.getTranslations(options.language, (options === null || options === void 0 ? void 0 : options.dictionaryName) || undefined)];
                case 5:
                    translations = _b.sent();
                    if (translations === null || translations === void 0 ? void 0 : translations[options.id])
                        return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(translations === null || translations === void 0 ? void 0 : translations[options.id].t, [options.language, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                    _b.label = 6;
                case 6:
                    if (!I18NConfig.translationEnabled()) return [3 /*break*/, 8];
                    translationPromise = I18NConfig.translate({ content: content, targetLanguage: options.language, options: __assign(__assign(__assign({}, options), { hash: key }), ((0, getMetadata_1.default)())) });
                    renderSettings = I18NConfig.getRenderSettings();
                    if (!(renderSettings.method !== "subtle" ||
                        !options.id) // because it is only saved if an id is present
                    ) return [3 /*break*/, 8]; // because it is only saved if an id is present
                    return [4 /*yield*/, translationPromise];
                case 7:
                    translation = _b.sent();
                    return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(translation, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
                case 8: return [2 /*return*/, (0, generaltranslation_1.renderContentToString)(contentAsArray, [options.targetLanguage, I18NConfig.getDefaultLocale()], variables, variableOptions)];
            }
        });
    });
}
//# sourceMappingURL=translate.js.map