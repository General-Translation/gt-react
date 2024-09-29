"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = T;
var generaltranslation_1 = require("generaltranslation");
var useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
var useLocale_1 = __importDefault(require("../hooks/useLocale"));
var renderDefaultChildren_1 = __importDefault(require("../provider/rendering/renderDefaultChildren"));
var internal_1 = require("../internal");
var primitives_1 = require("../primitives/primitives");
var GTContext_1 = __importDefault(require("../provider/GTContext"));
var renderTranslatedChildren_1 = __importDefault(require("../provider/rendering/renderTranslatedChildren"));
var useGT_1 = __importDefault(require("../hooks/useGT"));
var react_1 = require("react");
/**
 * Translation component that handles rendering translated content, including plural forms.
 * Used with the required `id` parameter instead of `const t = useGT()`.
 *
 * @param {string} [id] - Required identifier for the translation string.
 * @param {React.ReactNode} children - The content to be translated or displayed.
 * @param {number} [n] - Optional number to determine plural forms.
 * @param {Object} [variables] - Variables for interpolation in the translation string.
 * @param {Object} [variablesOptions] - Optional formatting options for numeric or date variables.
 * @param {any} [context] - Additional context for translation key generation.
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
    var _b, _c, _d;
    var children = _a.children, id = _a.id, variables = _a.variables, n = _a.n, variablesOptions = _a.variablesOptions, context = _a.context, props = __rest(_a, ["children", "id", "variables", "n", "variablesOptions", "context"]);
    if (!id) {
        throw new Error("Client-side <T> with no provided 'id' prop. Children: ".concat(children));
    }
    var translations = (0, GTContext_1.default)("<T id=\"".concat(id, "\"> with children ").concat(children, " used on the client-side outside of <GTProvider>")).translations;
    var t = (0, useGT_1.default)();
    if (!children) {
        return t(id, __assign({ variables: variables }, (variablesOptions && { variablesOptions: variablesOptions })));
    }
    variables = __assign(__assign({}, variables), (typeof n === 'number' && { n: n }));
    var locale = (0, useLocale_1.default)();
    var defaultLocale = (0, useDefaultLocale_1.default)();
    var taggedChildren = (0, react_1.useMemo)(function () { return (0, internal_1.addGTIdentifier)(children, props); }, [children, props]);
    var source;
    // Get a plural if appropriate (check type, if type, get branch, entry =)
    var isPlural = props && primitives_1.pluralBranchNames.some(function (branchName) { return branchName in props; });
    if (isPlural) {
        if (typeof n === 'number')
            (variables || (variables = {})).n = n;
        if (typeof (variables === null || variables === void 0 ? void 0 : variables.n) !== 'number') {
            throw new Error(id ?
                "ID \"".concat(id, "\": Plural requires \"n\" option.") :
                "<T> with props ".concat(JSON.stringify(props), ": Plural requires \"n\" option."));
        }
        source = (0, internal_1.getPluralBranch)(variables.n, [locale, defaultLocale], // not redundant, as locale could be a different dialect of the same language
        taggedChildren.props['data-generaltranslation'].branches) || taggedChildren.props.children;
    }
    else {
        source = taggedChildren;
    }
    var translationRequired = (function () {
        if (!locale)
            return false;
        if ((0, generaltranslation_1.isSameLanguage)(locale, defaultLocale))
            return false;
        return true;
    })();
    if (!translationRequired) {
        return (0, renderDefaultChildren_1.default)({
            entry: source,
            variables: variables,
            variablesOptions: variablesOptions
        });
    }
    // Do translation
    var translation = translations[id];
    if (!translation || !translation.t) {
        throw new Error("<T id=\"".concat(id, "\"> with children \"").concat(children, "\" is used in a client component without a corresponding translation."));
    }
    var target = translation.t;
    if (isPlural) {
        target = (0, internal_1.getPluralBranch)(variables === null || variables === void 0 ? void 0 : variables.n, [locale, defaultLocale], (_c = (_b = target.props) === null || _b === void 0 ? void 0 : _b['data-generaltranslation']) === null || _c === void 0 ? void 0 : _c.branches) || ((_d = target === null || target === void 0 ? void 0 : target.props) === null || _d === void 0 ? void 0 : _d.children);
    }
    return (0, renderTranslatedChildren_1.default)({
        source: source,
        target: target,
        variables: variables,
        variablesOptions: variablesOptions
    });
}
//# sourceMappingURL=T.js.map