import * as primitives from './primitives/primitives'
import calculateHash from "./internal/calculateHash";
import flattenDictionary from "./internal/flattenDictionary";
import addGTIdentifier from "./internal/addGTIdentifier";
import writeChildrenAsObjects from "./internal/writeChildrenAsObjects";
import getPluralBranch from "./plurals/getPluralBranch";
import getDictionaryEntry from "./provider/helpers/getDictionaryEntry";
import extractEntryMetadata from "./provider/helpers/extractEntryMetadata";
import getVariableProps from './variables/_getVariableProps';
import isVariableObject from './provider/helpers/isVariableObject';

export {
    addGTIdentifier, writeChildrenAsObjects, isVariableObject,
    flattenDictionary, getDictionaryEntry, getVariableProps,
    calculateHash, getPluralBranch, extractEntryMetadata, primitives
} 