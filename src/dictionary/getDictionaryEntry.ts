export default function getDictionaryEntry(id: string, dictionary: Record<string, any>): any | null {
    if (!id || typeof id !== 'string' || !dictionary || typeof dictionary !== 'object') return null;
    let current = dictionary;
    let dictionaryPath = id.split(".");
    for (const key of dictionaryPath) {
        current = current?.[key];
    }
    return current;
}