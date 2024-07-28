import I18NConfiguration from "../config/I18NConfiguration";

export default function createDictFunction(I18NConfig: I18NConfiguration) {
    return (id: string) => {
        return I18NConfig.getDictionaryEntry(id);
    }
}