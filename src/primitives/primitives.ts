import _defaultVariableNames from "../variables/_defaultVariableNames";

export const defaultVariableNames = _defaultVariableNames;

export const localeCookieName = "generaltranslation-locale";

export const libraryDefaultLocale = "en"; // language to use as default if none is provided

export const pluralForms = ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"] as const;

export function isAcceptedPluralForm(
    form: string
  ): form is (typeof pluralForms)[number] {
    return pluralForms.includes(form as (typeof pluralForms)[number]);
  }

export const defaultDictionary = {};

export const defaultDictionaryName = "default";

export const defaultCacheURL = "https://cache.gtx.dev";

