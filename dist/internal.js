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
import { isTranslationError } from "./utils/utils";
export { addGTIdentifier, writeChildrenAsObjects, isVariableObject, flattenDictionary, getDictionaryEntry, getVariableProps, getPluralBranch, extractEntryMetadata, getVariableName, getFallbackVariableName, renderDefaultChildren, renderTranslatedChildren, renderSkeleton, defaultRenderSettings, isTranslationError };
//# sourceMappingURL=internal.js.map