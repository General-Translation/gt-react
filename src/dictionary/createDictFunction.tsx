import I18NConfiguration from "../config/I18NConfiguration";
import getEntryMetadata from "../primitives/getEntryMetadata";

export default function createDictFunction(I18NConfig: I18NConfiguration) {
    return (id: string) => {
        const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(id));
        return entry;
    }
}