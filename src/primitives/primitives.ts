import _defaultVariableNames from "../variables/_defaultVariableNames";

const primitives = {
  defaultVariableNames: _defaultVariableNames,
  localeCookieName: "generaltranslation-locale",
  libraryDefaultLocale: "en", // language to use as default if none is provided
  pluralForms: ["singular", "plural", "dual", "zero", "one", "two", "few", "many", "other"],
  defaultCacheURL: "https://cache.gtx.dev",
  defaultDictionary: {},
} as const;

export default primitives;

export function isAcceptedPluralForm(
  form: string
): form is (typeof primitives.pluralForms)[number] {
  return primitives.pluralForms.includes(form as (typeof primitives.pluralForms)[number]);
}