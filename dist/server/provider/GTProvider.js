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
exports.default = GTProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
// On the server
require("server-only");
var react_1 = require("react");
var ClientProvider_1 = __importDefault(require("../../client/ClientProvider"));
var flattenDictionary_1 = __importDefault(require("../../primitives/dictionary/flattenDictionary"));
var getEntryMetadata_1 = __importDefault(require("../../primitives/rendering/getEntryMetadata"));
var addGTIdentifier_1 = __importDefault(require("../../primitives/translation/addGTIdentifier"));
var writeChildrenAsObjects_1 = __importDefault(require("../../primitives/translation/writeChildrenAsObjects"));
var calculateHash_1 = __importDefault(require("../../primitives/calculateHash"));
var getEntryTranslationType_1 = __importDefault(require("../../primitives/rendering/getEntryTranslationType"));
var InnerPlural_1 = __importDefault(require("../plural/InnerPlural"));
var cloneDictionary_1 = __importDefault(require("../../dictionary/cloneDictionary"));
/*
e.g.
dictionary = {
    "greeting": "Hello, world",
    "greeting.component": <div>Hello, world</div>
}
*/
function GTProvider(_a) {
    return __awaiter(this, void 0, void 0, function () {
        var dictionary, providerID, entry, translations, renderSettings, clonedDictionary, _i, _b, id_1, _c, entry, metadata, _d, translationType, isFunction, _e, ranges, zero, one, two, few, many, other, singular, dual, plural, tOptions, innerProps, taggedEntry, translationRequired, _f, local_1, remote_1;
        var _this = this;
        var I18NConfig = _a.I18NConfig, locale = _a.locale, defaultLocale = _a.defaultLocale, children = _a.children, shouldStore = _a.shouldStore, _g = _a.id, id = _g === void 0 ? '' : _g, props = __rest(_a, ["I18NConfig", "locale", "defaultLocale", "children", "shouldStore", "id"]);
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    dictionary = {};
                    providerID = id;
                    if (providerID) {
                        entry = (0, getEntryMetadata_1.default)(I18NConfig.getDictionaryEntry(providerID)).entry;
                        if (entry && !(0, react_1.isValidElement)(entry) && typeof entry === 'object') {
                            dictionary = (0, flattenDictionary_1.default)(entry);
                        }
                    }
                    else {
                        dictionary = (0, flattenDictionary_1.default)(I18NConfig.getDictionary());
                    }
                    translations = {};
                    renderSettings = I18NConfig.getRenderSettings();
                    clonedDictionary = (0, cloneDictionary_1.default)(dictionary);
                    for (_i = 0, _b = Object.keys(clonedDictionary); _i < _b.length; _i++) {
                        id_1 = _b[_i];
                        _c = (0, getEntryMetadata_1.default)(clonedDictionary[id_1]), entry = _c.entry, metadata = _c.metadata;
                        metadata = (props || metadata) ? __assign(__assign({}, props), (metadata || {})) : undefined;
                        _d = (0, getEntryTranslationType_1.default)(clonedDictionary[id_1]), translationType = _d.type, isFunction = _d.isFunction;
                        if (isFunction) {
                            entry = entry({});
                        }
                        if (translationType === "t") {
                            entry = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: entry });
                        }
                        else if (translationType === "plural") {
                            _e = metadata || {}, ranges = _e.ranges, zero = _e.zero, one = _e.one, two = _e.two, few = _e.few, many = _e.many, other = _e.other, singular = _e.singular, dual = _e.dual, plural = _e.plural, tOptions = __rest(_e, ["ranges", "zero", "one", "two", "few", "many", "other", "singular", "dual", "plural"]);
                            metadata = tOptions;
                            innerProps = {
                                ranges: ranges,
                                zero: zero,
                                one: one,
                                two: two,
                                few: few,
                                many: many,
                                other: other,
                                singular: singular,
                                dual: dual,
                                plural: plural
                            };
                            entry = ((0, jsx_runtime_1.jsx)(InnerPlural_1.default, __assign({ locales: [locale, defaultLocale], n: 1 }, innerProps, { children: entry })));
                        }
                        taggedEntry = (0, addGTIdentifier_1.default)(entry);
                        clonedDictionary[id_1] = [taggedEntry, metadata];
                        // change the dictionary here
                        // elsewhere we are changing the cloned dictionary
                        // we are just adding the gt identifier, nothing more
                        dictionary[id_1] = isFunction ? { function: true, defaultChildren: taggedEntry } : taggedEntry;
                    }
                    translationRequired = I18NConfig.translationRequired(locale);
                    if (!translationRequired) return [3 /*break*/, 3];
                    return [4 /*yield*/, I18NConfig.getTranslations(locale, props.dictionaryName)];
                case 1:
                    _f = _h.sent(), local_1 = _f.local, remote_1 = _f.remote;
                    return [4 /*yield*/, Promise.all(Object.keys(clonedDictionary).map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, entry, metadata, translationType, entryAsObjects, key, _b, translation, translationPromise, _c, _d, targetPromise, renderMethod, _e, _f, loadingFallbackTarget, errorFallbackTarget;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        _a = (0, getEntryMetadata_1.default)(clonedDictionary[id]), entry = _a.entry, metadata = _a.metadata;
                                        translationType = (0, getEntryTranslationType_1.default)(clonedDictionary[id]).type;
                                        entryAsObjects = (0, writeChildrenAsObjects_1.default)(entry);
                                        if (!(metadata === null || metadata === void 0 ? void 0 : metadata.context)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, (0, calculateHash_1.default)([entryAsObjects, metadata.context])];
                                    case 1:
                                        _b = _g.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, (0, calculateHash_1.default)(entryAsObjects)];
                                    case 3:
                                        _b = _g.sent();
                                        _g.label = 4;
                                    case 4:
                                        key = _b;
                                        return [4 /*yield*/, I18NConfig.getTranslation(locale, key, id, props.dictionaryName || undefined, { remote: remote_1, local: local_1 })];
                                    case 5:
                                        translation = _g.sent();
                                        if (translation) {
                                            return [2 /*return*/, translations[id] = translation];
                                        }
                                        // NEW TRANSLATION REQUIRED
                                        if (!I18NConfig.automaticTranslationEnabled())
                                            return [2 /*return*/];
                                        if (!(translationType === "string")) return [3 /*break*/, 8];
                                        translationPromise = I18NConfig.translate({ content: entry, targetLanguage: locale, options: __assign(__assign({}, metadata), { store: shouldStore, hash: key, id: id }) });
                                        if (!(renderSettings.method !== "subtle")) return [3 /*break*/, 7];
                                        _c = translations;
                                        _d = id;
                                        return [4 /*yield*/, translationPromise];
                                    case 6: return [2 /*return*/, _c[_d] = _g.sent()];
                                    case 7: return [2 /*return*/, translations[id] = entry];
                                    case 8:
                                        targetPromise = I18NConfig.translateChildren({ children: entryAsObjects, targetLanguage: locale, metadata: __assign(__assign({}, metadata), { store: shouldStore, hash: key, id: id }) });
                                        renderMethod = renderSettings.method;
                                        if (!(renderSettings.method === "hang")) return [3 /*break*/, 10];
                                        _e = translations;
                                        _f = id;
                                        return [4 /*yield*/, targetPromise];
                                    case 9: return [2 /*return*/, _e[_f] = _g.sent()];
                                    case 10:
                                        loadingFallbackTarget = props.fallback;
                                        errorFallbackTarget = children;
                                        if (renderMethod === "skeleton") {
                                            if (!loadingFallbackTarget)
                                                loadingFallbackTarget = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
                                        }
                                        else if (renderMethod === "replace") {
                                            if (!loadingFallbackTarget)
                                                loadingFallbackTarget = children;
                                        }
                                        if (renderSettings.renderPrevious && remote_1 && remote_1[id] && remote_1[id].k) {
                                            loadingFallbackTarget = remote_1[id].t;
                                            errorFallbackTarget = loadingFallbackTarget;
                                        }
                                        if (!["skeleton", "replace"].includes(renderMethod)) {
                                            return [2 /*return*/, translations[id] = errorFallbackTarget];
                                        }
                                        return [2 /*return*/, translations[id] = [targetPromise, {
                                                    loadingFallbackTarget: loadingFallbackTarget,
                                                    errorFallbackTarget: errorFallbackTarget
                                                }]];
                                }
                            });
                        }); }))];
                case 2:
                    _h.sent();
                    _h.label = 3;
                case 3: return [2 /*return*/, ((0, jsx_runtime_1.jsx)(ClientProvider_1.default, { locale: locale, defaultLocale: defaultLocale, dictionary: dictionary, translations: translations, translationRequired: translationRequired, children: children }))];
            }
        });
    });
}
//# sourceMappingURL=GTProvider.js.map