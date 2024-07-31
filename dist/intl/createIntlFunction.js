"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createIntlFunction;
function createIntlFunction(_a) {
    var { I18NConfig } = _a, defaultOptions = __rest(_a, ["I18NConfig"]);
    return (content_1, ...args_1) => __awaiter(this, [content_1, ...args_1], void 0, function* (content, options = Object.assign({}, defaultOptions)) {
        options.targetLanguage = options.targetLanguage || I18NConfig.getLocale();
        if (!content || typeof content !== 'string' || !I18NConfig.translationRequired(options.targetLanguage))
            return content;
        const translation = yield I18NConfig.getTranslation(options.targetLanguage, content, options.id, options.dictionaryName);
        if (translation)
            return translation;
        if (I18NConfig.hasRemoteSource()) {
            const translationPromise = I18NConfig.intl({ content, targetLanguage: options.targetLanguage, options });
            if (I18NConfig.getRenderMethod() !== "subtle") {
                return yield translationPromise;
            }
        }
        return content;
    });
}
//# sourceMappingURL=createIntlFunction.js.map