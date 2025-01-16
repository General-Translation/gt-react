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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var renderDefaultChildren_1 = __importDefault(require("../provider/rendering/renderDefaultChildren"));
var internal_1 = require("../internal");
var GTContext_1 = __importDefault(require("../provider/GTContext"));
var renderTranslatedChildren_1 = __importDefault(require("../provider/rendering/renderTranslatedChildren"));
var react_2 = require("react");
var renderVariable_1 = __importDefault(require("../provider/rendering/renderVariable"));
var createErrors_1 = require("../errors/createErrors");
var id_1 = require("generaltranslation/id");
var renderSkeleton_1 = __importDefault(require("../provider/rendering/renderSkeleton"));
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
 * <T id="welcome_message">
 *  Hello, <Var name="name">{name}</Var>!
 * </T>
 * ```
 *
 * @example
 * ```jsx
 * // Using plural translations:
 * <T id="item_count">
 *  <Plural n={n} singular={<>You have <Num value={n}/> item</>}>
 *      You have <Num value={n}/> items
 *  </Plural>
 * </T>
 * ```
 *
 */
function T(_a) {
    var children = _a.children, id = _a.id, props = __rest(_a, ["children", "id"]);
    if (!children)
        return undefined;
    if (!id)
        throw new Error((0, createErrors_1.createClientSideTWithoutIdError)(children));
    var variables = props.variables, variablesOptions = props.variablesOptions;
    var _b = (0, GTContext_1.default)("<T id=\"".concat(id, "\"> used on the client-side outside of <GTProvider>")), translations = _b.translations, translationRequired = _b.translationRequired, regionalTranslationRequired = _b.regionalTranslationRequired, translateChildren = _b.translateChildren, renderSettings = _b.renderSettings;
    var locale = (0, useLocale_1.default)();
    var defaultLocale = (0, useDefaultLocale_1.default)();
    var taggedChildren = (0, react_2.useMemo)(function () { return (0, internal_1.addGTIdentifier)(children); }, [children]);
    // ----- FETCH TRANSLATION ----- //
    var context = props.context;
    var _c = (0, react_2.useMemo)(function () {
        if (translationRequired) {
            var childrenAsObjects_1 = (0, internal_1.writeChildrenAsObjects)(taggedChildren);
            var hash_1 = (0, id_1.hashJsxChildren)(context
                ? { source: childrenAsObjects_1, context: context }
                : { source: childrenAsObjects_1 });
            return [childrenAsObjects_1, hash_1];
        }
        else {
            return [undefined, ''];
        }
    }, [context, taggedChildren, translationRequired]), childrenAsObjects = _c[0], hash = _c[1];
    var translation = translations === null || translations === void 0 ? void 0 : translations[id];
    var translationEntry = !(0, internal_1.isTranslationError)(translation) && (translation === null || translation === void 0 ? void 0 : translation[hash]);
    (0, react_1.useEffect)(function () {
        if (!translationRequired)
            return;
        // note have to recover from mis-matching hashing functions on client and server, if API returns wrong hash, then should fail gracefully
        if (!translation && !translationEntry) {
            translateChildren({
                source: childrenAsObjects,
                targetLocale: locale,
                metadata: {
                    id: id,
                    hash: hash
                }
            });
        }
    }, [translation, translationEntry, translationRequired]);
    // ----- RENDER METHODS ----- // 
    // for default/fallback rendering
    var renderDefaultLocale = function () {
        return (0, renderDefaultChildren_1.default)({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable_1.default
        });
    };
    var renderLoadingSkeleton = function () {
        return (0, renderSkeleton_1.default)({
            children: taggedChildren,
            variables: variables,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable_1.default
        });
    };
    var renderLoadingDefault = function () {
        if (regionalTranslationRequired) {
            return renderDefaultLocale();
        }
        return renderLoadingSkeleton();
    };
    var renderTranslation = function (target) {
        return (0, renderTranslatedChildren_1.default)({
            source: taggedChildren,
            target: target,
            variables: variables,
            variablesOptions: variablesOptions,
            locales: [locale, defaultLocale],
            renderVariable: renderVariable_1.default
        });
    };
    // ----- RENDER BEHAVIOR ----- //
    // fallback to default locale if no tx required
    if (!translationRequired) {
        return renderDefaultLocale();
    }
    // handle translation error
    if ((0, internal_1.isTranslationError)(translation)) {
        return renderDefaultLocale();
    }
    // loading behavior
    if (!translationEntry) {
        var loadingFallback = void 0;
        if (renderSettings.method === "skeleton") {
            loadingFallback = renderLoadingSkeleton();
        }
        else if (renderSettings.method === "replace") {
            loadingFallback = renderDefaultLocale();
        }
        else if (renderSettings.method === 'hang') {
            loadingFallback = undefined; // Blank screen
        }
        else if (renderSettings.method === 'subtle') {
            loadingFallback = renderDefaultLocale(); // TODO: implement subtle behavior for client-side rendering
        }
        else { // default behavior
            loadingFallback = renderLoadingDefault();
        }
        // The suspense exists here for hydration reasons
        return (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingFallback, children: loadingFallback });
    }
    // render translated content
    return renderTranslation(translationEntry);
}
T.gtTransformation = "translate-client";
exports.default = T;
//# sourceMappingURL=T.js.map