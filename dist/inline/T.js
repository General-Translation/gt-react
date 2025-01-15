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
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, useEffect } from "react";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier, writeChildrenAsObjects } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import { useMemo } from "react";
import renderVariable from "../provider/rendering/renderVariable";
import { createClientSideTWithoutIdError } from "../errors/createErrors";
import { hashJsxChildren } from "generaltranslation/id";
import renderSkeleton from "../provider/rendering/renderSkeleton";
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
        throw new Error(createClientSideTWithoutIdError(children));
    var variables = props.variables, variablesOptions = props.variablesOptions;
    var _b = useGTContext("<T id=\"".concat(id, "\"> used on the client-side outside of <GTProvider>")), translations = _b.translations, translationRequired = _b.translationRequired, regionalTranslationRequired = _b.regionalTranslationRequired, translateChildren = _b.translateChildren, renderSettings = _b.renderSettings;
    var locale = useLocale();
    var defaultLocale = useDefaultLocale();
    var taggedChildren = useMemo(function () { return addGTIdentifier(children); }, [children]);
    // Do translation
    var context = props.context;
    var _c = useMemo(function () {
        if (translationRequired) {
            var childrenAsObjects_1 = writeChildrenAsObjects(taggedChildren);
            var hash_1 = hashJsxChildren(context
                ? { source: childrenAsObjects_1, context: context }
                : { source: childrenAsObjects_1 });
            return [childrenAsObjects_1, hash_1];
        }
        else {
            return [undefined, ''];
        }
    }, [context, taggedChildren, translationRequired]), childrenAsObjects = _c[0], hash = _c[1];
    var translation = translations === null || translations === void 0 ? void 0 : translations[id];
    useEffect(function () {
        if (!translationRequired)
            return;
        if (!translation || (!translation[hash] && !translation.error)) {
            translateChildren({
                source: childrenAsObjects,
                targetLocale: locale,
                metadata: {
                    id: id,
                    hash: hash
                }
            });
        }
    }, [translation, translation === null || translation === void 0 ? void 0 : translation[hash], translationRequired]);
    // for default/fallback rendering
    function renderDefault() {
        return renderDefaultChildren({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable
        });
    }
    function renderLoadingSkeleton() {
        return renderSkeleton({
            children: taggedChildren,
            variables: variables,
            defaultLocale: defaultLocale,
            renderVariable: renderVariable
        });
    }
    if (!translationRequired) {
        return renderDefault();
    }
    // handle translation error
    if (translation === null || translation === void 0 ? void 0 : translation.error) {
        return renderDefault();
    }
    // handle no translation/waiting for translation
    if (!(translation === null || translation === void 0 ? void 0 : translation[hash])) {
        var loadingFallback = // Blank screen
         void 0; // Blank screen
        if (renderSettings.method === "skeleton") {
            loadingFallback = renderLoadingSkeleton();
        }
        else if (renderSettings.method === "replace") {
            loadingFallback = renderDefault();
        }
        else if (renderSettings.method === "default") {
            if (regionalTranslationRequired) {
                loadingFallback = renderDefault();
            }
            else {
                loadingFallback = renderLoadingSkeleton();
            }
        }
        else if (renderSettings.method === 'hang') {
            loadingFallback = undefined;
        }
        else if (renderSettings.method === 'subtle') {
            loadingFallback = renderDefault();
        }
        // The suspense exists here for hydration reasons
        return _jsx(Suspense, { fallback: loadingFallback, children: loadingFallback });
    }
    return renderTranslatedChildren({
        source: taggedChildren,
        target: translation[hash],
        variables: variables,
        variablesOptions: variablesOptions,
        locales: [locale, defaultLocale],
        renderVariable: renderVariable
    });
}
T.gtTransformation = "translate-client";
export default T;
//# sourceMappingURL=T.js.map