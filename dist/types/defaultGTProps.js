"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getDefaultFromEnv_1 = __importDefault(require("../config/local/getDefaultFromEnv"));
var defaultGTProps = {
    apiKey: (0, getDefaultFromEnv_1.default)('GT_API_KEY'),
    projectID: (0, getDefaultFromEnv_1.default)('GT_PROJECT_ID'),
    cacheURL: "https://cache.gtx.dev",
    baseURL: "https://prod.gtx.dev",
    remoteSource: true,
    automaticTranslation: true,
    // Locale info
    defaultLocale: 'en',
    getLocale: function () { return 'en '; },
    // Rendering
    renderPrevious: true,
    renderMethod: "replace", // "skeleton", "hang", "subtle"
    renderTimeout: 12500,
    // Dictionaries
    dictionaryName: "default",
    dictionary: {},
    // Batching config
    maxConcurrentRequests: 2,
    batchInterval: 1000,
    // Other metadata
    getMetadata: function () { return {}; }
};
exports.default = defaultGTProps;
//# sourceMappingURL=defaultGTProps.js.map