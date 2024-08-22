import getEntryMetadata from "../primitives/getEntryMetadata";
export default function createDictFunction(I18NConfig) {
    return (id) => {
        const { entry } = getEntryMetadata(I18NConfig.getDictionaryEntry(id));
        return entry;
    };
}
//# sourceMappingURL=createDictFunction.js.map