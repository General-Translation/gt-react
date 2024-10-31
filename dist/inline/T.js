"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = T;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var generaltranslation_1 = require("generaltranslation");
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var renderDefaultChildren_1 = __importDefault(require("../provider/rendering/renderDefaultChildren"));
var internal_1 = require("../internal");
var GTContext_1 = __importDefault(require("../provider/GTContext"));
var renderTranslatedChildren_1 = __importDefault(require("../provider/rendering/renderTranslatedChildren"));
var react_2 = require("react");
/**
 * Translation component that handles rendering translated content, including plural forms.
 * Used with the required `id` parameter instead of `const t = useGT()`.
 *
 * @param {string} [id] - Required identifier for the translation string.
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {any} [context] - Additional context used for translation.
 * @param {Object} [props] - Additional props for the component.
 * @returns {JSX.Element} The rendered translation or fallback content based on the provided configuration.
 *
 * @throws {Error} If a plural translation is requested but the `n` option is not provided.
 *
 * @example
 * ```jsx
 * // Basic usage:
 * <T id="welcome_message" variables={{ name: "John" }}>
 *  Hello, <Var name="name"/>!
 * </T>
 * ```
 *
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count" variables={{ n: 3 }} singular={"You have one item"}>
 *  You have <Num/> items
 * </T>
 * ```
 *
 */
function T(_a) {
    var children = _a.children, id = _a.id, props = __rest(_a, ["children", "id"]);
    if (!children)
        return undefined;
    if (!id) {
        throw new Error("Client-side <T> with no provided 'id' prop. Children: ".concat(children));
    }
    var variables = props.variables, variablesOptions = props.variablesOptions;
    var translations = (0, GTContext_1.default)("<T id=\"".concat(id, "\"> used on the client-side outside of <GTProvider>")).translations;
    var locale = (0, useLocale_1.default)();
    var defaultLocale = (0, useDefaultLocale_1.default)();
    var taggedChildren = (0, react_2.useMemo)(function () { return (0, internal_1.addGTIdentifier)(children); }, [children]);
    var translationRequired = (function () {
        if (!locale)
            return false;
        if ((0, generaltranslation_1.isSameLanguage)(locale, defaultLocale))
            return false;
        return true;
    })();
    if (!translationRequired) {
        return (0, renderDefaultChildren_1.default)({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale
        });
    }
    // Do translation
    var context = props.context;
    var _b = (0, react_2.useMemo)(function () {
        var childrenAsObjects = (0, internal_1.writeChildrenAsObjects)(taggedChildren);
        var key = (0, internal_1.hashReactChildrenObjects)(context ? [childrenAsObjects, context] : childrenAsObjects);
        return [childrenAsObjects, key];
    }, [context, taggedChildren]), childrenAsObjects = _b[0], key = _b[1];
    var translation = translations[id];
    if (translation === null || translation === void 0 ? void 0 : translation.promise) {
        throw new Error("<T id=\"".concat(id, "\">, \"").concat(id, "\" is also used as a key in the dictionary. Don't give <T> components the same ID as dictionary entries."));
    }
    if (!translation || !translation.t || translation.k !== key) {
        if ((process === null || process === void 0 ? void 0 : process.env.NODE_ENV) === 'development' || (process === null || process === void 0 ? void 0 : process.env.NODE_ENV) === 'test') {
            throw new Error("<T id=\"".concat(id, "\"> is used in a client component without a valid corresponding translation. This can cause Next.js hydration errors.")
                + "\n\nYour current environment: \"".concat(process === null || process === void 0 ? void 0 : process.env.NODE_ENV, "\". In production, this error will display as a warning only, and content will be rendered in your default language.")
                + "\n\nTo fix this error, consider using a getGT() dictionary pattern or pushing translations from the command line in advance.");
        }
        console.warn("<T id=\"".concat(id, "\"> is used in a client component without a valid corresponding translation."));
        var defaultChildren = (0, renderDefaultChildren_1.default)({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale
        });
        // The suspense exists here for hydration reasons
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: defaultChildren, children: defaultChildren }));
    }
    return (0, renderTranslatedChildren_1.default)({
        source: taggedChildren, target: translation.t,
        variables: variables,
        variablesOptions: variablesOptions,
        locales: [locale, defaultLocale]
    });
}
//# sourceMappingURL=T.js.map