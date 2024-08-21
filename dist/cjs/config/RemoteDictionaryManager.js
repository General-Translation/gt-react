"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteDictionaryManager = void 0;
const getDictionaryReference_1 = __importDefault(require("../primitives/getDictionaryReference"));
/**
 * Manages remote dictionaries for translation purposes.
 */
class RemoteDictionaryManager {
    /**
     * Creates an instance of RemoteDictionaryManager.
     */
    constructor() {
        this.config = {
            cacheURL: "https://cache.gtx.dev",
            projectID: ""
        };
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
        this.requestedTranslations = new Map();
    }
    /**
     * Sets the configuration for the RemoteDictionaryManager.
     * @param {Partial<RemoteDictionaryConfig>} newConfig - The new configuration to apply.
     */
    setConfig(newConfig) {
        this.config = Object.assign(Object.assign({}, this.config), newConfig);
    }
    /**
     * Fetches a dictionary from the remote cache.
     * @param {string} reference - The dictionary reference.
     * @returns {Promise<Record<string, any> | null>} The fetched dictionary or null if not found.
     */
    _fetchDictionary(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.config.cacheURL}/${this.config.projectID}/${reference}`);
                const result = yield response.json();
                if (Object.keys(result).length) {
                    return result;
                }
            }
            catch (error) {
                console.error('Remote dictionary error:', error);
            }
            return null;
        });
    }
    /**
     * Retrieves a dictionary based on locale and dictionary name.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @returns {Promise<Record<string, any> | null>} The dictionary data or null if not found.
     */
    getDictionary(locale, dictionaryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = (0, getDictionaryReference_1.default)(locale, dictionaryName);
            if (this.dictionaryMap.has(reference)) {
                return this.dictionaryMap.get(reference) || null;
            }
            if (this.fetchPromises.has(reference)) {
                return (yield this.fetchPromises.get(reference)) || null;
            }
            const fetchPromise = this._fetchDictionary(reference);
            this.fetchPromises.set(reference, fetchPromise);
            const retrievedDictionary = yield fetchPromise;
            this.fetchPromises.delete(reference);
            if (retrievedDictionary) {
                this.dictionaryMap.set(reference, retrievedDictionary);
            }
            return retrievedDictionary;
        });
    }
    /**
     * Sets a new entry in the specified dictionary.
     * @param {string} locale - The locale of the dictionary.
     * @param {string} dictionaryName - The name of the dictionary.
     * @param {string} key - The key for the new entry.
     * @param {string} [id=key] - The id for the new entry, defaults to key if not provided.
     * @param {any} translation - The translation value.
     * @returns {boolean} True if the entry was set successfully, false otherwise.
     */
    setDictionary(locale, dictionaryName, key, id = key, translation) {
        if (!(locale && dictionaryName && key && id && translation))
            return false;
        const reference = (0, getDictionaryReference_1.default)(locale, dictionaryName);
        const currentDictionary = this.dictionaryMap.get(reference) || {};
        this.dictionaryMap.set(reference, Object.assign(Object.assign({}, currentDictionary), { [id]: { k: key, t: translation } }));
        return true;
    }
    /**
     * Marks a translation as requested for a given locale and dictionary
     */
    setTranslationRequested(locale, dictionaryName) {
        const reference = (0, getDictionaryReference_1.default)(locale, dictionaryName);
        this.requestedTranslations.set(reference, true);
    }
    /**
     * Checks if a translation has been requested for a given locale and dictionary
     */
    getTranslationRequested(locale, dictionaryName) {
        const reference = (0, getDictionaryReference_1.default)(locale, dictionaryName);
        return this.requestedTranslations.get(reference) ? true : false;
    }
}
exports.RemoteDictionaryManager = RemoteDictionaryManager;
const remoteDictionaryManager = new RemoteDictionaryManager();
exports.default = remoteDictionaryManager;
//# sourceMappingURL=RemoteDictionaryManager.js.map