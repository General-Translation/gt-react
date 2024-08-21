export default function createDictFunction(I18NConfig) {
    return (id) => {
        const entry = I18NConfig.getDictionaryEntry(id);
        if (Array.isArray(entry)) {
            return entry[0];
        }
        return entry;
    };
}
//# sourceMappingURL=createDictFunction.js.map