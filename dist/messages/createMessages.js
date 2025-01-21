// ---- ERRORS ---- //
export var projectIdMissingError = 'gt-react Error: General Translation cloud services require a project ID! Find yours at www.generaltranslation.com/dashboard.';
export var createPluralMissingError = function (children) { return "<Plural> component with children \"".concat(children, "\" requires \"n\" option."); };
export var createClientSideTWithoutIdError = function (children) { return "Client-side <T> with no provided 'id' prop. Children: \"".concat(children, "\""); };
export var createStringTranslationError = function (content, id) { return "gt-next string translation error. tx(\"".concat(content, "\")").concat(id ? " with id \"".concat(id, "\"") : '', " failed."); };
export var createClientSideTDictionaryCollisionError = function (id) { return "<T id=\"".concat(id, "\">, \"").concat(id, "\" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries."); };
export var createClientSideTHydrationError = function (id) { return "<T id=\"".concat(id, "\"> is used in a client component without a valid saved translation. This can cause hydration errors.")
    + "\n\nTo fix this error, consider using a dictionary with useGT() or pushing translations from the command line in advance."; };
export var createNestedDataGTError = function (child) { return "General Translation already in use on child with props: ".concat(child.props, ". This usually occurs when you nest <T> components within the same file. Remove one of the <T> components to continue."); };
export var createNestedTError = function (child) { var _a; return "General Translation: Nested <T> components. The inner <T> has the id: \"".concat((_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.id, "\"."); };
export var renderingError = 'General Translation: Rendering error.';
export var dynamicTranslationError = "Error fetching batched translations:";
export var createGenericRuntimeTranslationError = function (id, hash) {
    if (!id) {
        return "Translation failed for hash: ".concat(hash);
    }
    else {
        return "Translation failed for id: ".concat(id, ", hash: ").concat(hash, " ");
    }
};
// ---- WARNINGS ---- //
export var createLibraryNoEntryWarning = function (id) { return "gt-react: No dictionary entry found for id: \"".concat(id, "\""); };
export var createNoEntryWarning = function (id, prefixedId) { return "t('".concat(id, "') finding no translation for dictionary item ").concat(prefixedId, " !"); };
export var createMismatchingHashWarning = function (expectedHash, receivedHash) { return "Mismatching hashes! Expected hash: ".concat(expectedHash, ", but got hash: ").concat(receivedHash, ". We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs"); };
export var createMismatchingIdHashWarning = function (expectedId, expectedHash, receivedId, receivedHash) { return "Mismatching ids or hashes! Expected id: ".concat(expectedId, ", hash: ").concat(expectedHash, ", but got id: ").concat(receivedId, ", hash: ").concat(receivedHash, ". We will still render your translation, but make sure to update to the newest version: www.generaltranslation.com/docs"); };
//# sourceMappingURL=createMessages.js.map