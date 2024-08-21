import I18NConfiguration from "../config/I18NConfiguration";

export default function createDictFunction(I18NConfig: I18NConfiguration) {
    return (id: string) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        if (Array.isArray(entry)) {
            return entry[0];
        }
        return entry;
    }
}