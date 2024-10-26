declare const primitives: {
    readonly defaultVariableNames: {
        variable: "value";
        number: "n";
        datetime: "date";
        currency: "cost";
    };
    readonly localeCookieName: "generaltranslation-locale";
    readonly libraryDefaultLocale: "en";
    readonly pluralForms: readonly ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"];
    readonly defaultCacheURL: "https://cache.gtx.dev";
    readonly defaultDictionary: {};
    readonly defaultDictionaryName: "default";
};
export default primitives;
export declare function isAcceptedPluralForm(form: string): form is (typeof primitives.pluralForms)[number];
//# sourceMappingURL=primitives.d.ts.map