"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkTFunctionOptions;
// should check initial t function options (without added metadata from dictionary)
function checkTFunctionOptions(options) {
    if (!options || !Object.keys(options).length)
        return true;
    if (["singular", "plural", "dual", "one", "two", "zero", "few", "many", "other"].some(key => {
        if (options.hasOwnProperty(key)) {
            console.warn(`gt-react: It's bad practice to include "${key}" in your t() function, because the dictionary won't register it as a plural if there are no alternate forms. Try including "${key}" in your dictionary metadata instead. See https://docs.generaltranslation.com/essentials#plurals.`);
            return true;
        }
        return false;
    }))
        return false;
    return true;
}
//# sourceMappingURL=checkTFunctionOptions.js.map