import _defaultVariableNames from "../variables/_defaultVariableNames";
export var defaultVariableNames = _defaultVariableNames;
export var localeCookieName = "generaltranslation-locale";
export var libraryDefaultLocale = "en"; // language to use as default if none is provided
export var pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
export function isAcceptedPluralForm(form) {
    return pluralForms.includes(form);
}
export var defaultDictionary = {};
export var defaultDictionaryName = "default";
export var defaultCacheURL = "https://cache.gtx.dev";
//# sourceMappingURL=primitives.js.map