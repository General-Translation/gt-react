"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var renderDefaultChildren_1 = __importDefault(require("../provider/rendering/renderDefaultChildren"));
var internal_1 = require("../internal");
var GTContext_1 = __importDefault(require("../provider/GTContext"));
var renderTranslatedChildren_1 = __importDefault(require("../provider/rendering/renderTranslatedChildren"));
var react_2 = require("react");
var renderVariable_1 = __importDefault(require("../provider/rendering/renderVariable"));
var createErrors_1 = require("../errors/createErrors");
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
    var _b = (0, GTContext_1.default)("<T id=\"".concat(id, "\"> used on the client-side outside of <GTProvider>")), translations = _b.translations, translationRequired = _b.translationRequired, translateChildren = _b.translateChildren, renderSettings = _b.renderSettings;
    var locale = (0, useLocale_1.default)();
    var defaultLocale = (0, useDefaultLocale_1.default)();
    var taggedChildren = (0, react_2.useMemo)(function () { return (0, internal_1.addGTIdentifier)(children); }, [children]);
    if (!translationRequired) {
        return (0, renderDefaultChildren_1.default)({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable_1.default
        });
    }
    // Do translation
    var context = props.context;
    var _c = (0, react_2.useMemo)(function () {
        var childrenAsObjects = (0, internal_1.writeChildrenAsObjects)(taggedChildren);
        var hash = (0, internal_1.hashReactChildrenObjects)(context ? [childrenAsObjects, context] : childrenAsObjects);
        return [childrenAsObjects, hash];
    }, [context, taggedChildren]), childrenAsObjects = _c[0], hash = _c[1];
    var translation = translations[id];
    (0, react_1.useEffect)(function () {
        if (!translation || !translation[hash]) {
            if (typeof window !== 'undefined') {
                console.log("client render t, translation", translation, hash);
            }
            else {
                console.log("client (server) render t, translation", translation, hash);
            }
            console.log("client <T> do translation: source", childrenAsObjects, "hash", hash);
            translateChildren({
                source: childrenAsObjects,
                targetLocale: locale,
                metadata: {
                    id: id,
                    hash: hash
                }
            });
        }
    }, [translation, translation === null || translation === void 0 ? void 0 : translation[hash]]);
    // handle no translation/waiting for translation
    if (!translation || !translation[hash]) {
        var rd = function () { return (0, renderDefaultChildren_1.default)({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable_1.default
        }); };
        if (translation.error) {
            return rd();
        }
        var loadingFallback = // Blank screen
         void 0; // Blank screen
        if (renderSettings.method === "skeleton") {
            loadingFallback = (0, jsx_runtime_1.jsx)(react_1.default.Fragment, {}, "skeleton_".concat(id));
        }
        else {
            loadingFallback = rd();
        }
        // console.error(createClientSideTHydrationError(id));
        // The suspense exists here for hydration reasons
        return (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: loadingFallback, children: loadingFallback });
    }
    return (0, renderTranslatedChildren_1.default)({
        source: taggedChildren,
        target: translation[hash],
        variables: variables,
        variablesOptions: variablesOptions,
        locales: [locale, defaultLocale],
        renderVariable: renderVariable_1.default
    });
}
T.gtTransformation = "translate-client";
exports.default = T;
//# sourceMappingURL=T.js.map