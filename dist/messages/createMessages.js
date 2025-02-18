"use strict";
// ---- ERRORS ---- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMismatchingIdHashWarning = exports.createMismatchingHashWarning = exports.createInvalidElementEntryWarning = exports.createNoEntryWarning = exports.createLibraryNoEntryWarning = exports.createGenericRuntimeTranslationError = exports.dynamicTranslationError = exports.renderingError = exports.createNestedTError = exports.createNestedDataGTError = exports.createClientSideTHydrationError = exports.createClientSideTDictionaryCollisionError = exports.createStringTranslationError = exports.createClientSideTWithoutIdError = exports.createPluralMissingError = exports.projectIdMissingError = void 0;
exports.projectIdMissingError = "gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.";
var createPluralMissingError = function (children) {
    return "<Plural> component with children \"".concat(children, "\" requires \"n\" option.");
};
exports.createPluralMissingError = createPluralMissingError;
var createClientSideTWithoutIdError = function (children) {
    return "Client-side <T> with no provided 'id' prop. Children: \"".concat(children, "\"");
};
exports.createClientSideTWithoutIdError = createClientSideTWithoutIdError;
var createStringTranslationError = function (content, id) {
    return "gt-next string translation error. tx(\"".concat(content, "\")").concat(id ? " with id \"".concat(id, "\"") : "", " failed.");
};
exports.createStringTranslationError = createStringTranslationError;
var createClientSideTDictionaryCollisionError = function (id) {
    return "<T id=\"".concat(id, "\">, \"").concat(id, "\" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries.");
};
exports.createClientSideTDictionaryCollisionError = createClientSideTDictionaryCollisionError;
var createClientSideTHydrationError = function (id) {
    return "<T id=\"".concat(id, "\"> is used in a client component without a valid saved translation. This can cause hydration errors.") +
        "\n\nTo fix this error, consider using a dictionary with useGT() or pushing translations from the command line in advance.";
};
exports.createClientSideTHydrationError = createClientSideTHydrationError;
var createNestedDataGTError = function (child) {
    return "General Translation already in use on child with props: ".concat(child.props, ". This usually occurs when you nest <T> components within the same file. Remove one of the <T> components to continue.");
};
exports.createNestedDataGTError = createNestedDataGTError;
var createNestedTError = function (child) { var _a; return "General Translation: Nested <T> components. The inner <T> has the id: \"".concat((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.id, "\"."); };
exports.createNestedTError = createNestedTError;
exports.renderingError = "General Translation: Rendering error.";
exports.dynamicTranslationError = "Error fetching batched translations:";
var createGenericRuntimeTranslationError = function (id, hash) {
    if (!id) {
        return "Translation failed for hash: ".concat(hash);
    }
    else {
        return "Translation failed for id: ".concat(id, ", hash: ").concat(hash, " ");
    }
};
exports.createGenericRuntimeTranslationError = createGenericRuntimeTranslationError;
// ---- WARNINGS ---- //
var createLibraryNoEntryWarning = function (id) {
    return "gt-react: No dictionary entry found for id: \"".concat(id, "\"");
};
exports.createLibraryNoEntryWarning = createLibraryNoEntryWarning;
var createNoEntryWarning = function (id, prefixedId) {
    return "t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedId, " !");
};
exports.createNoEntryWarning = createNoEntryWarning;
var createInvalidElementEntryWarning = function (id, prefixedId) {
    return "t('".concat(id, "') invalid dictionary entry for ").concat(prefixedId, " ! useElement() can only be used to render JSX elements. Strings and other types are not allowed.");
};
exports.createInvalidElementEntryWarning = createInvalidElementEntryWarning;
var createMismatchingHashWarning = function (expectedHash, receivedHash) {
    return "Mismatching hashes! Expected hash: ".concat(expectedHash, ", but got hash: ").concat(receivedHash, ". We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs");
};
exports.createMismatchingHashWarning = createMismatchingHashWarning;
var createMismatchingIdHashWarning = function (expectedId, expectedHash, receivedId, receivedHash) {
    return "Mismatching ids or hashes! Expected id: ".concat(expectedId, ", hash: ").concat(expectedHash, ", but got id: ").concat(receivedId, ", hash: ").concat(receivedHash, ". We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs");
};
exports.createMismatchingIdHashWarning = createMismatchingIdHashWarning;
//# sourceMappingURL=createMessages.js.map