import flattenDictionary from "./internal/flattenDictionary";
import addGTIdentifier from "./internal/addGTIdentifier";
import writeChildrenAsObjects from "./internal/writeChildrenAsObjects";
import getPluralBranch from "./branches/plurals/getPluralBranch";
import getDictionaryEntry from "./provider/helpers/getDictionaryEntry";
import extractEntryMetadata from "./provider/helpers/extractEntryMetadata";
import getVariableProps from './variables/_getVariableProps';
import isVariableObject from './provider/helpers/isVariableObject';
import getVariableName, { getFallbackVariableName } from "./variables/getVariableName";
import renderDefaultChildren from "./provider/rendering/renderDefaultChildren";
import renderTranslatedChildren from "./provider/rendering/renderTranslatedChildren";
import { defaultRenderSettings } from "./provider/rendering/defaultRenderSettings";
import renderSkeleton from "./provider/rendering/renderSkeleton";
import { Dictionary, RenderMethod, TranslatedChildren, TranslatedContent, TranslationError, TranslationsObject, DictionaryEntry } from "./types/types";
import { isTranslationError } from "./utils/utils";
export { addGTIdentifier, writeChildrenAsObjects, isVariableObject, Dictionary, flattenDictionary, getDictionaryEntry, getVariableProps, DictionaryEntry, getPluralBranch, extractEntryMetadata, getVariableName, getFallbackVariableName, renderDefaultChildren, renderTranslatedChildren, renderSkeleton, RenderMethod, defaultRenderSettings, TranslatedChildren, TranslationsObject, TranslatedContent, TranslationError, isTranslationError };
//# sourceMappingURL=internal.d.ts.map