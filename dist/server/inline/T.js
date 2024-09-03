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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var addGTIdentifier_1 = __importDefault(require("../../primitives/translation/addGTIdentifier"));
var writeChildrenAsObjects_1 = __importDefault(require("../../primitives/translation/writeChildrenAsObjects"));
var renderChildren_1 = __importDefault(require("./renderChildren"));
var Resolver_1 = __importDefault(require("./Resolver"));
var calculateHash_1 = __importDefault(require("../../primitives/calculateHash"));
var ServerT = function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    var translationRequired, translationsPromise, defaultLocale, taggedChildren, childrenAsObjects, key, _b, id, translations, translation, translationExists, I18NChildren, I18NChildrenPromise, renderSettings, renderMethod, promise, loadingFallback, errorFallback, resolveI18NPromise;
    var _c;
    var I18NConfig = _a.I18NConfig, children = _a.children, locale = _a.locale, props = __rest(_a, ["I18NConfig", "children", "locale"]);
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                translationRequired = (children && I18NConfig.translationRequired(locale)) ? true : false;
                if (!translationRequired) {
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }))];
                }
                translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
                defaultLocale = I18NConfig.getDefaultLocale();
                taggedChildren = (0, addGTIdentifier_1.default)(children);
                childrenAsObjects = (0, writeChildrenAsObjects_1.default)(taggedChildren);
                if (!props.context) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, calculateHash_1.default)([childrenAsObjects, props.context])];
            case 1:
                _b = _d.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, calculateHash_1.default)(childrenAsObjects)];
            case 3:
                _b = _d.sent();
                _d.label = 4;
            case 4:
                key = _b;
                id = props.id ? props.id : key;
                return [4 /*yield*/, translationsPromise];
            case 5:
                translations = _d.sent();
                console.log(id, '=>', JSON.stringify(childrenAsObjects));
                console.log(id, key, (_c = translations === null || translations === void 0 ? void 0 : translations.remote) === null || _c === void 0 ? void 0 : _c[id].k);
                return [4 /*yield*/, I18NConfig.getTranslation(locale, key, id, props.dictionaryName || undefined, translations)
                    // Check if a translation for this site already exists and return it if it does
                ];
            case 6:
                translation = _d.sent();
                translationExists = translation ? true : false;
                if (translationExists) {
                    I18NChildren = (0, renderChildren_1.default)({ source: taggedChildren, target: translation, locale: locale, defaultLocale: defaultLocale });
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: I18NChildren }))];
                }
                // Check if a new translation for this site can be created
                if (!I18NConfig.automaticTranslationEnabled()) {
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children }))];
                }
                I18NChildrenPromise = I18NConfig.translateChildren({ children: childrenAsObjects, targetLanguage: locale, metadata: __assign(__assign({}, props), { hash: key }) });
                renderSettings = I18NConfig.getRenderSettings();
                renderMethod = (props === null || props === void 0 ? void 0 : props.renderMethod) || renderSettings.method;
                promise = I18NChildrenPromise.then(function (target) { return (0, renderChildren_1.default)({ source: taggedChildren, target: target, locale: locale, defaultLocale: defaultLocale }); });
                loadingFallback = props.fallback;
                errorFallback = children;
                if (renderMethod === "skeleton") {
                    if (!loadingFallback)
                        loadingFallback = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
                }
                else if (renderMethod === "replace") {
                    if (!loadingFallback)
                        loadingFallback = children;
                }
                if (renderSettings.renderPrevious && translations.remote && translations.remote[id] && translations.remote[id].k) {
                    // in case there's a previous translation on file
                    loadingFallback = (0, renderChildren_1.default)({ source: taggedChildren, target: translations.remote[id].t, locale: locale, defaultLocale: defaultLocale });
                    errorFallback = loadingFallback;
                }
                resolveI18NPromise = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 4]);
                                return [4 /*yield*/, promise];
                            case 1: return [2 /*return*/, _b.sent()];
                            case 2:
                                _a = _b.sent();
                                return [4 /*yield*/, errorFallback];
                            case 3: return [2 /*return*/, _b.sent()];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                if (renderMethod === "hang") {
                    // Wait until the site is translated to return
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Resolver_1.default, { fallback: errorFallback, children: promise }) }))];
                }
                if (!["skeleton", "replace"].includes(renderMethod)) {
                    // If none of those, i.e. "subtle" 
                    // return the children, with no special rendering
                    // a translation may be available from a cached translation dictionary next time the component is loaded
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: errorFallback }))];
                }
                return [2 /*return*/, ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingFallback, children: (0, jsx_runtime_1.jsx)(Resolver_1.default, { fallback: errorFallback, children: promise }) }))];
        }
    });
}); };
ServerT.gtTransformation = "translate";
exports.default = ServerT;
//# sourceMappingURL=T.js.map