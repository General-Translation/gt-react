export default function createDictFunction(I18NConfig) {
    return (id) => {
        return I18NConfig.getDictionaryEntry(id);
    };
}
//# sourceMappingURL=createDictFunction.js.map