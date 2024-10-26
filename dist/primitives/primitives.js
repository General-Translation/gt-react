import _defaultVariableNames from "../variables/_defaultVariableNames";
var primitives = {
    defaultVariableNames: _defaultVariableNames,
    localeCookieName: "generaltranslation-locale",
    libraryDefaultLocale: "en", // language to use as default if none is provided
    pluralForms: ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"],
    defaultCacheURL: "https://cache.gtx.dev",
    defaultDictionary: {},
    defaultDictionaryName: "default"
};
export default primitives;
export function isAcceptedPluralForm(form) {
    return primitives.pluralForms.includes(form);
}
//# sourceMappingURL=primitives.js.map