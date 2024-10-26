var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { isSameLanguage } from "generaltranslation";
import useDefaultLocale from "../hooks/useDefaultLocale";
import useLocale from "../hooks/useLocale";
import renderDefaultChildren from "../provider/rendering/renderDefaultChildren";
import { addGTIdentifier } from "../internal";
import useGTContext from "../provider/GTContext";
import renderTranslatedChildren from "../provider/rendering/renderTranslatedChildren";
import useGT from "../hooks/useGT";
import { useMemo } from "react";
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
export default function T(_a) {
    var children = _a.children, id = _a.id, props = __rest(_a, ["children", "id"]);
    if (!id) {
        throw new Error("Client-side <T> with no provided 'id' prop. Children: ".concat(children));
    }
    var variables = props.variables, variablesOptions = props.variablesOptions;
    var translations = useGTContext("<T id=\"".concat(id, "\"> used on the client-side outside of <GTProvider>")).translations;
    var t = useGT();
    if (!children) {
        return _jsx(React.Fragment, { children: t(id, __assign({ variables: variables }, (variablesOptions && { variablesOptions: variablesOptions }))) }, id);
    }
    var locale = useLocale();
    var defaultLocale = useDefaultLocale();
    var taggedChildren = useMemo(function () { return addGTIdentifier(children); }, [children]);
    var translationRequired = (function () {
        if (!locale)
            return false;
        if (isSameLanguage(locale, defaultLocale))
            return false;
        return true;
    })();
    if (!translationRequired) {
        return renderDefaultChildren({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale
        });
    }
    // Do translation
    var translation = translations[id];
    if (!translation || !translation.t) {
        console.error("<T id=\"".concat(id, "\"> is used in a client component without a corresponding translation."));
        return renderDefaultChildren({
            children: taggedChildren,
            variables: variables,
            variablesOptions: variablesOptions,
            defaultLocale: defaultLocale
        });
    }
    return renderTranslatedChildren({
        source: taggedChildren, target: translation.t,
        variables: variables,
        variablesOptions: variablesOptions,
        locales: [locale, defaultLocale]
    });
}
//# sourceMappingURL=T.js.map