type DictionaryManagerParams = {
    cacheURL?: string;
    projectID: string;
};
export default class RemoteDictionaryManager {
    cacheURL: string;
    projectID: string;
    private dictionaryMap;
    private fetchPromises;
    constructor({ cacheURL, projectID }: DictionaryManagerParams);
    _fetchDictionary(reference: string): Promise<Record<string, any> | null>;
    getDictionary(locale: string, dictionaryName: string): Promise<Record<string, any> | null>;
    setDictionary(locale: string, dictionaryName: string, key: string, id: string | undefined, translation: any): boolean;
}
export {};
//# sourceMappingURL=RemoteDictionaryManager.d.ts.map