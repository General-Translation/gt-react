'use client'

import React, { ReactNode, useMemo } from 'react';
import getPluralBranch, { Range } from '../../primitives/getPluralBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import { useGTContext } from '../ClientProvider';
import createValues from '../../primitives/createValues';

/**
 * Plural component that processes a given number and renders the appropriate branch or children.
 * 
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientPlural({ children, id, n, values, ranges, ...branches }: {
    children?: any;
    id?: string;
    n: number;
    ranges?: Range[];
    zero?: any;
    one?: any;
    two?: any;
    few?: any;
    many?: any;
    other?: any;
    singular?: any;
    dual?: any;
    plural?: any;
    values?: Record<string, any>;
}): ReactNode {

    let translate;
    try {
        ({ translate } = useGTContext());
    } catch {
        throw new Error(`<ClientPlural>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
    }

    const defaultTranslation = useMemo(() => { 
        return translate(id) || children; 
    }, [children, id]);

    const completeBranches = useMemo(() => {
        if (!id) {
            return { ...branches, ranges };
        } else {
            const t = (innerID: string) => translate(`${id}.${innerID}`);
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
            }
        }
    }, [branches, ranges, id])

    const locales = [useLocale(), useDefaultLocale()]; // user's language

    const branch = useMemo(() => {
        return ((typeof n === 'number' && completeBranches) ? getPluralBranch(n, locales, completeBranches) : null) || defaultTranslation;
    }, [n, completeBranches, defaultTranslation, locales])

    const renderedChildren = useMemo(() => {
        return <RenderClientVariable variables={createValues(n, values)}>{branch}</RenderClientVariable>
    }, [n, branch])

    return (
        <span>
            {renderedChildren}
        </span>
    );

};