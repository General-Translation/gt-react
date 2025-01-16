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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
import { useCallback, useEffect, useRef, useState } from "react";
import { dynamicTranslationError } from "../../errors/createErrors";
export default function useDynamicTranslation(_a) {
    var _this = this;
    var targetLocale = _a.targetLocale, projectId = _a.projectId, devApiKey = _a.devApiKey, runtimeUrl = _a.runtimeUrl, defaultLocale = _a.defaultLocale, setTranslations = _a.setTranslations, metadata = __rest(_a, ["targetLocale", "projectId", "devApiKey", "runtimeUrl", "defaultLocale", "setTranslations"]);
    metadata = __assign(__assign({}, metadata), { projectId: projectId, sourceLocale: defaultLocale });
    var translationEnabled = !!(runtimeUrl && projectId);
    if (!translationEnabled)
        return { translationEnabled: translationEnabled, translateContent: function () { }, translateChildren: function () { } };
    // Queue to store requested keys between renders.
    var requestQueueRef = useRef(new Map());
    // Trigger a fetch when keys have been added.
    var _b = useState(0), fetchTrigger = _b[0], setFetchTrigger = _b[1];
    var translateContent = useCallback(function (params) {
        var id = params.metadata.id ? "".concat(params.metadata.id, "-") : '';
        var key = "".concat(id).concat(params.metadata.hash, "-").concat(params.targetLocale);
        requestQueueRef.current.set(key, { type: 'content', source: params.source, metadata: params.metadata });
        setFetchTrigger(function (n) { return n + 1; });
    }, []);
    /**
     * Call this from <T> components to request a translation key.
     * Keys are batched and fetched in the next effect cycle.
     */
    var translateChildren = useCallback(function (params) {
        var id = params.metadata.id ? "".concat(params.metadata.id, "-") : '';
        var key = "".concat(id).concat(params.metadata.hash, "-").concat(params.targetLocale);
        requestQueueRef.current.set(key, { type: 'jsx', source: params.source, metadata: params.metadata });
        setFetchTrigger(function (n) { return n + 1; });
    }, []);
    useEffect(function () {
        if (requestQueueRef.current.size === 0) {
            return;
        }
        var isCancelled = false;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var requests, response, _a, results_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requests = Array.from(requestQueueRef.current.values());
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, fetch("".concat(runtimeUrl, "/v1/runtime/").concat(projectId, "/client"), {
                                method: 'POST',
                                headers: __assign({ 'Content-Type': 'application/json' }, (devApiKey && { 'x-gt-dev-api-key': devApiKey })),
                                body: JSON.stringify({
                                    requests: requests,
                                    targetLocale: targetLocale,
                                    metadata: metadata
                                }),
                            })];
                    case 2:
                        response = _b.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        _a = Error.bind;
                        return [4 /*yield*/, response.text()];
                    case 3: throw new (_a.apply(Error, [void 0, _b.sent()]))();
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        results_1 = _b.sent();
                        if (!isCancelled) {
                            setTranslations(function (prev) {
                                var merged = __assign({}, (prev || {}));
                                results_1.forEach(function (result, index) {
                                    var _a;
                                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                                    var request = requests[index];
                                    if ('translation' in result && result.translation && result.reference) {
                                        var translation = result.translation, _r = result.reference, id = _r.id, key = _r.key;
                                        if (id !== ((_b = request === null || request === void 0 ? void 0 : request.metadata) === null || _b === void 0 ? void 0 : _b.id) || key !== ((_c = request === null || request === void 0 ? void 0 : request.metadata) === null || _c === void 0 ? void 0 : _c.hash)) {
                                            console.warn("Mismatching ids or hashes! Expected id: ".concat((_d = request === null || request === void 0 ? void 0 : request.metadata) === null || _d === void 0 ? void 0 : _d.id, ", hash: ").concat((_e = request === null || request === void 0 ? void 0 : request.metadata) === null || _e === void 0 ? void 0 : _e.hash, ", but got id: ").concat(id, ", hash: ").concat(key, ". We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs"));
                                        }
                                        merged[id] = (_a = {}, _a[((_f = request === null || request === void 0 ? void 0 : request.metadata) === null || _f === void 0 ? void 0 : _f.hash) || key] = translation, _a);
                                    }
                                    else if ('error' in result && result.error && result.code) {
                                        merged[((_h = (_g = request === null || request === void 0 ? void 0 : request.data) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h.id) || ((_k = (_j = request === null || request === void 0 ? void 0 : request.data) === null || _j === void 0 ? void 0 : _j.metadata) === null || _k === void 0 ? void 0 : _k.hash)] = {
                                            error: result.error || "An error occurred.",
                                            code: result.code || 500
                                        };
                                        console.error("Translation failed".concat(((_l = result === null || result === void 0 ? void 0 : result.reference) === null || _l === void 0 ? void 0 : _l.id) ? " for id: ".concat(result.reference.id) : ''), result);
                                    }
                                    else {
                                        // id defaults to hash if none provided
                                        merged[((_o = (_m = request === null || request === void 0 ? void 0 : request.data) === null || _m === void 0 ? void 0 : _m.metadata) === null || _o === void 0 ? void 0 : _o.id) || ((_q = (_p = request === null || request === void 0 ? void 0 : request.data) === null || _p === void 0 ? void 0 : _p.metadata) === null || _q === void 0 ? void 0 : _q.hash)] = {
                                            error: "An error occurred.",
                                            code: 500
                                        };
                                    }
                                });
                                return merged;
                            });
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        error_1 = _b.sent();
                        console.error(dynamicTranslationError, error_1);
                        setTranslations(function (prev) {
                            var merged = __assign({}, (prev || {}));
                            requests.forEach(function (request) {
                                var _a, _b;
                                // id defaults to hash if none provided
                                merged[((_a = request === null || request === void 0 ? void 0 : request.metadata) === null || _a === void 0 ? void 0 : _a.id) || ((_b = request === null || request === void 0 ? void 0 : request.metadata) === null || _b === void 0 ? void 0 : _b.hash)] = {
                                    error: "An error occurred.",
                                    code: 500
                                };
                            });
                            return merged;
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        requestQueueRef.current.clear();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            isCancelled = true;
        };
    }, [fetchTrigger, setTranslations]);
    return { translateContent: translateContent, translateChildren: translateChildren, translationEnabled: translationEnabled };
}
//# sourceMappingURL=useDynamicTranslation.js.map