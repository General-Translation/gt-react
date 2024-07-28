const getDictionaryReference = (locale: string, dictionaryName: string): string => {
    return `${encodeURIComponent(locale)}/${encodeURIComponent(dictionaryName)}`;
}

type DictionaryManagerParams = {
    cacheURL?: string;
    projectID: string;
}

export default class DictionaryManager {
    
    cacheURL: string;
    projectID: string;
    
    private dictionaryMap: Map<string, Record<string, any>>;
    private fetchPromises: Map<string, Promise<Record<string, any> | null>>;
    
    constructor({
        cacheURL = "https://cache.gtx.dev",
        projectID
    }: DictionaryManagerParams) {
        this.cacheURL = cacheURL;
        this.projectID = projectID;
        this.dictionaryMap = new Map();
        this.fetchPromises = new Map();
    }

    async _fetchDictionary(reference: string): Promise<Record<string, any> | null> {
        try {
            const response = await fetch(`${this.cacheURL}/${this.projectID}/${reference}`);
            const result = await response.json();
            if (Object.keys(result)) {
                return result;
            }
        } catch (error) {
            console.error('dictionaryManager error', error);
        }
        return null;
    }

    async getDictionary(locale: string, dictionaryName: string): Promise<Record<string, any> | null> {
        const reference = getDictionaryReference(locale, dictionaryName);
        if (this.dictionaryMap && this.dictionaryMap.has(reference)) {
            return this.dictionaryMap.get(reference) || null;
        }
        if (this.fetchPromises.has(reference)) {
            return await this.fetchPromises.get(reference) || null;
        }

        const fetchPromise = this._fetchDictionary(reference);
        this.fetchPromises.set(reference, fetchPromise);

        const retrievedDictionary = await fetchPromise;
        this.fetchPromises.delete(reference);

        if (retrievedDictionary) {
            this.dictionaryMap.set(reference, retrievedDictionary);
        }
        return retrievedDictionary;
    }

    // setDictionary: given a locale, dictionaryName, id and a key, write a new entry in locale/dictionaryName of { [id]: { k: key, t: translation } }
    setDictionary(locale: string, dictionaryName: string, key: string, id: string = key, translation: any) {
        if (!(locale && dictionaryName && key && translation)) return;
        const reference = getDictionaryReference(locale, dictionaryName);
        const currentDictionary = this.dictionaryMap.get(reference);
        this.dictionaryMap.set(reference, { ...currentDictionary, [id]: { k: key, t: translation }});
    }
}
