"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var internal_1 = require("gt-react/internal");
var getDefaultFromEnv_1 = __importDefault(require("../utils/getDefaultFromEnv"));
exports.default = {
    apiKey: (0, getDefaultFromEnv_1.default)('GT_API_KEY'),
    projectID: (0, getDefaultFromEnv_1.default)('GT_PROJECT_ID'),
    baseURL: 'https://prod.gtx.dev',
    cacheURL: internal_1.primitives.defaultCacheURL,
    defaultLocale: internal_1.primitives.libraryDefaultLocale,
    getLocale: function () { return internal_1.primitives.libraryDefaultLocale; },
    renderSettings: {
        fallbackToPrevious: true,
        method: "skeleton",
        timeout: null
    },
    dictionaryName: internal_1.primitives.defaultDictionaryName,
    getMetadata: function () { return ({}); },
    _maxConcurrectRequests: 2,
    _batchInterval: 1000
};
//# sourceMappingURL=defaultInitGTProps.js.map