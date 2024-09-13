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
exports.default = T;
var jsx_runtime_1 = require("react/jsx-runtime");
var internal_1 = require("gt-react/internal");
var getI18NConfig_1 = __importDefault(require("../../utils/getI18NConfig"));
var getLocale_1 = __importDefault(require("../../request/getLocale"));
var getMetadata_1 = __importDefault(require("../../request/getMetadata"));
var react_1 = require("react");
var Resolver_1 = __importDefault(require("./Resolver"));
var renderTranslatedChildren_1 = __importDefault(require("../rendering/renderTranslatedChildren"));
var renderDefaultChildren_1 = __importDefault(require("../rendering/renderDefaultChildren"));
function T(_a) {
    return __awaiter(this, void 0, void 0, function () {
        var I18NConfig, locale, defaultLocale, translationRequired, translationsPromise, taggedChildren, source, isPlural, childrenAsObjects, key, _b, translations, translation, target, translationPromise, promise, loadingFallback, errorFallback, target;
        var children = _a.children, id = _a.id, variables = _a.variables, variablesOptions = _a.variablesOptions, n = _a.n, renderSettings = _a.renderSettings, props = __rest(_a, ["children", "id", "variables", "variablesOptions", "n", "renderSettings"]);
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    I18NConfig = (0, getI18NConfig_1.default)();
                    locale = (0, getLocale_1.default)();
                    defaultLocale = I18NConfig.getDefaultLocale();
                    translationRequired = I18NConfig.translationRequired(locale);
                    if (translationRequired) {
                        translationsPromise = I18NConfig.getTranslations(locale, props.dictionaryName);
                    }
                    taggedChildren = (0, internal_1.addGTIdentifier)(children, props);
                    source = taggedChildren;
                    isPlural = props && internal_1.primitives.pluralBranchNames.some(function (branchName) { return branchName in props; });
                    if (isPlural) {
                        if (typeof n === 'number')
                            (variables || (variables = {})).n = n;
                        if (typeof (variables === null || variables === void 0 ? void 0 : variables.n) !== 'number') {
                            throw new Error(id ?
                                "ID \"".concat(id, "\": Plural requires \"n\" option.") :
                                "<T> with props ".concat(JSON.stringify(props), ": Plural requires \"n\" option."));
                        }
                        source = (0, internal_1.getPluralBranch)(variables.n, [locale, defaultLocale], // not redundant, as locale could be a different dialect of the same language
                        taggedChildren) || taggedChildren.t;
                    }
                    if (!translationRequired) {
                        return [2 /*return*/, (0, renderDefaultChildren_1.default)({
                                children: source,
                                variables: variables,
                                variablesOptions: variablesOptions
                            })];
                    }
                    childrenAsObjects = (0, internal_1.writeChildrenAsObjects)(taggedChildren);
                    if (!props.context) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, internal_1.calculateHash)([childrenAsObjects, props.context])];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, (0, internal_1.calculateHash)(childrenAsObjects)];
                case 3:
                    _b = _c.sent();
                    _c.label = 4;
                case 4:
                    key = _b;
                    return [4 /*yield*/, translationsPromise];
                case 5:
                    translations = _c.sent();
                    translation = translations === null || translations === void 0 ? void 0 : translations[id || key];
                    if ((translation === null || translation === void 0 ? void 0 : translation.k) === key) {
                        target = translation.t;
                        if (isPlural) {
                            target = (0, internal_1.getPluralBranch)(variables === null || variables === void 0 ? void 0 : variables.n, [locale, defaultLocale], translation) || target;
                        }
                        return [2 /*return*/, (0, renderTranslatedChildren_1.default)({
                                source: source,
                                target: target,
                                variables: variables,
                                variablesOptions: variablesOptions
                            })];
                    }
                    renderSettings || (renderSettings = I18NConfig.getRenderSettings());
                    translationPromise = I18NConfig.translateChildren({
                        children: childrenAsObjects,
                        targetLanguage: locale,
                        metadata: __assign(__assign(__assign(__assign(__assign({}, props), (id && { id: id })), { hash: key }), ((0, getMetadata_1.default)())), (renderSettings.timeout && { timeout: renderSettings.timeout }))
                    });
                    promise = translationPromise.then(function (translation) {
                        var target = translation.t ? translation.t : translation;
                        if (isPlural) {
                            target = (0, internal_1.getPluralBranch)(variables === null || variables === void 0 ? void 0 : variables.n, [locale, defaultLocale], translation) || target;
                        }
                        return (0, renderTranslatedChildren_1.default)({
                            source: source,
                            target: target,
                            variables: variables,
                            variablesOptions: variablesOptions
                        });
                    });
                    if (renderSettings.fallbackToPrevious && translation) {
                        target = translation.t;
                        if (isPlural) {
                            target = (0, internal_1.getPluralBranch)(variables === null || variables === void 0 ? void 0 : variables.n, [locale, defaultLocale], translation) || target;
                        }
                        loadingFallback = (0, renderTranslatedChildren_1.default)({
                            source: source,
                            target: target,
                            variables: variables,
                            variablesOptions: variablesOptions
                        });
                        errorFallback = loadingFallback;
                    }
                    else {
                        errorFallback = (0, renderDefaultChildren_1.default)({
                            children: source,
                            variables: variables,
                            variablesOptions: variablesOptions
                        });
                        if (renderSettings.method === "skeleton") {
                            loadingFallback = (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
                        }
                        else if (renderSettings.method === "replace") {
                            loadingFallback = errorFallback;
                        }
                    }
                    if (renderSettings.method === "hang") {
                        // Wait until the site is translated to return
                        return [2 /*return*/, (0, jsx_runtime_1.jsx)(Resolver_1.default, { children: promise, fallback: errorFallback })];
                    }
                    if (!["skeleton", "replace"].includes(renderSettings.method) && !id) {
                        // If none of those, i.e. "subtle" 
                        // return the children, with no special rendering
                        // a translation may be available from a cached translation dictionary next time the component is loaded
                        return [2 /*return*/, errorFallback];
                    }
                    return [2 /*return*/, ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingFallback, children: (0, jsx_runtime_1.jsx)(Resolver_1.default, { children: promise, fallback: errorFallback }) }))];
            }
        });
    });
}
//# sourceMappingURL=T.js.map