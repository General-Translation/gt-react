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
exports.default = useOnDemandTranslation;
var generaltranslation_1 = __importDefault(require("generaltranslation"));
var react_1 = require("react");
/**
 * Hook to fetch translations on-demand with batching and concurrency control.
 * @param {object} params - Hook parameters.
 * @param {string} [params.baseUrl] - Base URL for the API.
 * @param {string} [params.devApiKey] - Development API key.
 * @param {string} [params.projectId] - Project ID for translations.
 * @param {string} [params.defaultLocale] - Default locale.
 * @param {number} params.maxConcurrentRequests - Max number of concurrent fetch requests.
 * @param {number} params.batchInterval - Interval between processing batches.
 * @param {Record<string, any>} [params.metadata] - Additional metadata.
 * @returns {{ translateJsx: (request: TranslationRequest) => Promise<any> }}
 */
function useOnDemandTranslation(_a) {
    var baseUrl = _a.baseUrl, devApiKey = _a.devApiKey, projectId = _a.projectId, defaultLocale = _a.defaultLocale, _b = _a.maxConcurrentRequests, maxConcurrentRequests = _b === void 0 ? 5 : _b, _c = _a.batchInterval, batchInterval = _c === void 0 ? 50 : _c, metadata = __rest(_a, ["baseUrl", "devApiKey", "projectId", "defaultLocale", "maxConcurrentRequests", "batchInterval"]);
    var gt = (0, react_1.useMemo)(function () { return new generaltranslation_1.default({ defaultLocale: defaultLocale, projectId: projectId, baseUrl: baseUrl, devApiKey: devApiKey }); }, [defaultLocale, projectId, baseUrl, devApiKey]);
    var queue = (0, react_1.useRef)([]);
    var activeRequests = (0, react_1.useRef)(0);
    var processing = (0, react_1.useRef)(false);
    var processQueue = (0, react_1.useCallback)(function () {
        if (processing.current)
            return;
        var availableSlots = maxConcurrentRequests - activeRequests.current;
        if (availableSlots <= 0)
            return; // No slots available for new requests
        var batch = queue.current.splice(0, availableSlots); // Take only what can be sent concurrently
        if (batch.length === 0)
            return; // Nothing to process
        activeRequests.current += batch.length; // Reserve slots for this batch
        processing.current = true;
        gt.translateBatchFromClient(batch)
            .then(function (results) {
            results.forEach(function (result, index) {
                var item = batch[index];
                item.resolve(result.translation);
            });
        })
            .catch(function (error) {
            batch.forEach(function (item) { return item.reject(error); });
        })
            .finally(function () {
            activeRequests.current -= batch.length; // Release slots
            processing.current = false;
            if (queue.current.length > 0) {
                processQueue(); // Continue processing the queue
            }
        });
    }, [gt, maxConcurrentRequests]);
    (0, react_1.useEffect)(function () {
        var interval = setInterval(function () {
            processQueue();
        }, batchInterval);
        return function () { return clearInterval(interval); };
    }, [processQueue, batchInterval]);
    var translateJsx = function (request) {
        return new Promise(function (resolve, reject) {
            queue.current.push({
                type: 'jsx',
                data: __assign(__assign({}, request), { metadata: __assign(__assign({}, request.metadata), metadata) }),
                resolve: resolve,
                reject: reject
            });
        });
    };
    return { translateJsx: translateJsx };
}
//# sourceMappingURL=useOnDemandTranslation.js.map