var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getDictionaryReference = (locale, dictionaryName) => {
    return `${encodeURIComponent(locale)}/${encodeURIComponent(dictionaryName)}`;
};
export default class RemoteDictionaryManager {
    constructor({ cacheURL = "https://cache.gtx.dev", projectID }) {
        this.cacheURL = cacheURL;
        this.projectID = projectID;
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
    }
    _fetchDictionary(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.cacheURL}/${this.projectID}/${reference}`);
                const result = yield response.json();
                if (Object.keys(result)) {
                    return result;
                }
            }
            catch (error) {
                console.error('dictionaryManager error', error);
            }
            return null;
        });
    }
    getDictionary(locale, dictionaryName) {
        return __awaiter(this, void 0, void 0, function* () {
            const reference = getDictionaryReference(locale, dictionaryName);
            if (this.dictionaryMap && this.dictionaryMap.has(reference)) {
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
    // setDictionary: given a locale, dictionaryName, id and a key, write a new entry in locale/dictionaryName of { [id]: { k: key, t: translation } }
    setDictionary(locale, dictionaryName, key, id = key, translation) {
        if (!(locale && dictionaryName && key && id && translation))
            return false;
        const reference = getDictionaryReference(locale, dictionaryName);
        const currentDictionary = this.dictionaryMap.get(reference);
        this.dictionaryMap.set(reference, Object.assign(Object.assign({}, currentDictionary), { [id]: { k: key, t: translation } }));
        return true;
    }
}
//# sourceMappingURL=RemoteDictionaryManager.js.map