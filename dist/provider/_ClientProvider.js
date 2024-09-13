"use strict";
'use client';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = _ClientProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var client_1 = require("gt-react/client");
var internal_1 = require("gt-react/internal");
var generaltranslation_1 = require("generaltranslation");
var ClientResolver_1 = __importDefault(require("./ClientResolver"));
// meant to be used inside <GTServerProvider>
function _ClientProvider(_a) {
    var children = _a.children, dictionary = _a.dictionary, translations = _a.translations, locale = _a.locale, defaultLocale = _a.defaultLocale, translationRequired = _a.translationRequired;
    var _b = (0, react_1.useState)(false), hasMounted = _b[0], setHasMounted = _b[1];
    (0, react_1.useLayoutEffect)(function () {
        // prevent hydration errors + flickering when translations load
        setHasMounted(true);
    }, []);
    var translate = (0, react_1.useCallback)(function (id, options, f) {
        if (options === void 0) { options = {}; }
        var _a = (0, internal_1.extractEntryMetadata)(dictionary[id]), entry = _a.entry, metadata = _a.metadata;
        if (metadata && metadata.isFunction) {
            if (typeof f !== 'function') {
                throw new Error("You're trying to call a function in the server dictionary on the client-side, but functions can't be passed directly from server to client. "
                    + "Try including the function you want to call as a parameter in t(), like t(\"".concat(id, "\", ").concat(options ? JSON.stringify(options) : 'undefined', ", MyFunction)"));
            }
            entry = (0, internal_1.addGTIdentifier)(f(options));
        }
        var variables = options;
        var variablesOptions;
        if (metadata === null || metadata === void 0 ? void 0 : metadata.variablesOptions)
            variablesOptions = __assign(__assign({}, variablesOptions || {}), metadata.variablesOptions);
        if (options.variablesOptions)
            variablesOptions = __assign(__assign({}, variablesOptions || {}), options.variablesOptions);
        if (typeof entry === 'string') {
            return (0, generaltranslation_1.renderContentToString)(translationRequired ? translations[id] : entry, [locale, defaultLocale], variables, variablesOptions);
        }
        ;
        var source = entry;
        var isPlural = entry && typeof entry === 'object' && internal_1.primitives.pluralBranchNames.some(function (branchName) { var _a, _b; return branchName in (((_b = (_a = entry === null || entry === void 0 ? void 0 : entry.props) === null || _a === void 0 ? void 0 : _a['data-generaltranslation']) === null || _b === void 0 ? void 0 : _b.branches) || {}); });
        if (isPlural) {
            if (typeof (variables === null || variables === void 0 ? void 0 : variables.n) !== 'number')
                throw new Error("t(\"".concat(id, "\"): Plural requires \"n\" option."));
            source = (0, internal_1.getPluralBranch)(variables.n, [locale, defaultLocale], source.props['data-generaltranslation'].branches) || source.props.children;
        }
        if (!translationRequired) {
            return (0, client_1._renderDefaultChildren)({
                entry: source,
                variables: variables,
                variablesOptions: variablesOptions
            });
        }
        if (translations[id]) {
            var renderTranslation = (function (entry) {
                var target = entry.t;
                if (isPlural) {
                    target = (0, internal_1.getPluralBranch)(variables.n, [locale, defaultLocale], target.props['data-generaltranslation'].branches) || target.props.children;
                }
                return (0, client_1._renderTranslatedChildren)({
                    source: source,
                    target: target,
                    variables: variables,
                    variablesOptions: variablesOptions
                });
            });
            var translation = translations[id];
            if (translation.promise) {
                if (!translation.errorFallback) {
                    translation.errorFallback = (0, client_1._renderDefaultChildren)({
                        entry: source,
                        variables: variables,
                        variablesOptions: variablesOptions
                    });
                }
                else {
                    translation.errorFallback = renderTranslation(translation.errorFallback);
                }
                if (!translation.loadingFallback) {
                    translation.loadingFallback = translation.errorFallback;
                }
                return ((0, jsx_runtime_1.jsx)(ClientResolver_1.default, { promise: translation.promise, renderTranslation: renderTranslation, errorFallback: translation.errorFallback, loadingFallback: translation.loadingFallback }));
            }
            return renderTranslation(translation);
        }
    }, [dictionary, translations]);
    return ((0, jsx_runtime_1.jsx)(client_1._GTContext.Provider, { value: {
            translate: translate,
            locale: locale,
            defaultLocale: defaultLocale
        }, children: hasMounted ?
            children :
            undefined }));
}
//# sourceMappingURL=_ClientProvider.js.map