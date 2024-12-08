"use strict";
// ---- ERRORS ---- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoEntryWarning = exports.createLibraryNoEntryWarning = exports.createNestedDataGTError = exports.createClientSideTHydrationError = exports.createClientSideTDictionaryCollisionError = exports.createStringTranslationError = exports.createClientSideTWithoutIDError = exports.createPluralMissingError = exports.projectIdMissingError = void 0;
exports.projectIdMissingError = 'gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.';
var createPluralMissingError = function (children) { return "<Plural> component with children \"".concat(children, "\" requires \"n\" option."); };
exports.createPluralMissingError = createPluralMissingError;
var createClientSideTWithoutIDError = function (children) { return "Client-side <T> with no provided 'id' prop. Children: \"".concat(children, "\""); };
exports.createClientSideTWithoutIDError = createClientSideTWithoutIDError;
var createStringTranslationError = function (content, id) { return "gt-next string translation error. tx(\"".concat(content, "\")").concat(id ? " with id \"".concat(id, "\"") : '', " failed."); };
exports.createStringTranslationError = createStringTranslationError;
var createClientSideTDictionaryCollisionError = function (id) { return "<T id=\"".concat(id, "\">, \"").concat(id, "\" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries."); };
exports.createClientSideTDictionaryCollisionError = createClientSideTDictionaryCollisionError;
var createClientSideTHydrationError = function (id) { return "<T id=\"".concat(id, "\"> is used in a client component without a valid saved translation. This can cause hydration errors.")
    + "\n\nTo fix this error, consider using a dictionary with useGT() or pushing translations from the command line in advance."; };
exports.createClientSideTHydrationError = createClientSideTHydrationError;
var createNestedDataGTError = function (child) { return "General Translation already in use on child \"".concat(child, "\". This usually occurs when you nest <T> components within the same file. Remove one of the <T> components to continue."); };
exports.createNestedDataGTError = createNestedDataGTError;
// ---- WARNINGS ---- //
var createLibraryNoEntryWarning = function (id) { return "gt-react: No dictionary entry found for id: \"".concat(id, "\""); };
exports.createLibraryNoEntryWarning = createLibraryNoEntryWarning;
var createNoEntryWarning = function (id, prefixedID) { return "t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedID, " !"); };
exports.createNoEntryWarning = createNoEntryWarning;
//# sourceMappingURL=createErrors.js.map