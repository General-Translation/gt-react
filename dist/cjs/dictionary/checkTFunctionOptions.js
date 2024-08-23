"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkTFunctionOptions;
// should check initial t function options (without added metadata from dictionary)
function checkTFunctionOptions(options) {
    if (!options)
        return true;
    if (["singular", "plural", "dual", "one", "two", "zero", "few", "many", "other"].some(key => {
        if (options.hasOwnProperty(key)) {
            console.warn(`gt-react: It's bad practice to include "${key}" in your t() function. Try including it in your dictionary metadata instead. See https://docs.generaltranslation.com/dictionaries/plurals.`);
            return true;
        }
        return false;
    }))
        return false;
    return true;
}
//# sourceMappingURL=checkTFunctionOptions.js.map