"use strict";
'use client';
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
exports.default = ClientPlural;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const getPluralBranch_1 = __importDefault(require("../../primitives/getPluralBranch"));
const RenderClientVariable_1 = __importDefault(require("../value/RenderClientVariable"));
const useLocale_1 = __importDefault(require("../hooks/useLocale"));
const useDefaultLocale_1 = __importDefault(require("../hooks/useDefaultLocale"));
const ClientProvider_1 = require("../ClientProvider");
/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 *
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
function ClientPlural(_a) {
    var { children, id, n, ranges } = _a, branches = __rest(_a, ["children", "id", "n", "ranges"]);
    let translate;
    try {
        ({ translate } = (0, ClientProvider_1.useGTContext)());
    }
    catch (_b) {
        throw new Error(`<ClientPlural>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
    }
    const defaultTranslation = (0, react_1.useMemo)(() => {
        return translate(id) || children;
    }, [children, id]);
    const completeBranches = (0, react_1.useMemo)(() => {
        if (!id) {
            return Object.assign(Object.assign({}, branches), { ranges });
        }
        else {
            const t = (innerID) => translate(`${id}.${innerID}`);
            return {
                zero: branches.zero || t('zero') || undefined,
                one: branches.one || t('one') || undefined,
                two: branches.two || t('two') || undefined,
                few: branches.few || t('few') || undefined,
                many: branches.many || t('many') || undefined,
                other: branches.other || t('other') || undefined,
                singular: branches.singular || t('singular') || undefined,
                dual: branches.dual || t('dual') || undefined,
                plural: branches.plural || t('plural') || undefined,
                ranges: ranges || t('ranges') || undefined,
            };
        }
    }, [branches, ranges, id]);
    const locales = [(0, useLocale_1.default)(), (0, useDefaultLocale_1.default)()]; // user's language
    const branch = (0, react_1.useMemo)(() => {
        return ((typeof n === 'number' && completeBranches) ? (0, getPluralBranch_1.default)(n, locales, completeBranches) : null) || defaultTranslation;
    }, [n, completeBranches, defaultTranslation, locales]);
    const renderedChildren = (0, react_1.useMemo)(() => {
        return (0, jsx_runtime_1.jsx)(RenderClientVariable_1.default, { variables: (typeof n === 'number') ? { n } : undefined, children: branch });
    }, [n, branch]);
    return ((0, jsx_runtime_1.jsx)("span", { children: renderedChildren }));
}
;
//# sourceMappingURL=ClientPlural.js.map