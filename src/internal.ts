import primitives, { isAcceptedPluralForm } from './primitives/primitives'
import hashReactChildrenObjects from "./internal/hashReactChildrenObjects";
import flattenDictionary from "./internal/flattenDictionary";
import addGTIdentifier from "./internal/addGTIdentifier";
import writeChildrenAsObjects from "./internal/writeChildrenAsObjects";
import getPluralBranch from "./branches/plurals/getPluralBranch";
import getDictionaryEntry from "./provider/helpers/getDictionaryEntry";
import extractEntryMetadata from "./provider/helpers/extractEntryMetadata";
import getVariableProps from './variables/_getVariableProps';
import isVariableObject from './provider/helpers/isVariableObject';

export {
    addGTIdentifier, writeChildrenAsObjects, isVariableObject,
    flattenDictionary, getDictionaryEntry, getVariableProps,
    hashReactChildrenObjects, getPluralBranch, extractEntryMetadata, primitives,
    isAcceptedPluralForm
} 