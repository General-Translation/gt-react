'use client'

import React, { ReactNode,  useContext,  useMemo } from 'react';
import getNumericBranch, { Range } from '../../primitives/getNumericBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import useGT from '../hooks/useGT';
import { GTContext } from '../ClientProvider';

type NumericProps = {
    n?: number;
    id?: string;
    children?: any;
    ranges?: Range[];
    [key: string]: any;
}

/**
 * Numeric component that processes a given number and renders the appropriate branch or children.
 * 
 * @param {ReactNode} children - Default children.
 * @param {number} n - Number to branch based on.
 * @param {Range[]} ranges - Array of range objects used for branch selection.
 * @param {Record<string, any>} ...branches - Named branches, e.g. "singular", "plural" and their associated branches.
 * @returns {ReactNode}
 */
export default function ClientNumeric({ children, id, n, ranges, ...branches }: NumericProps): ReactNode {

    const ctx = useContext(GTContext);
    if (!ctx) {
        console.error(`<Numeric>, with children:\n\n${children}\n\nid: ${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        return <RenderClientVariable variables={(typeof n === 'number') ? { n } : undefined}>{children}</RenderClientVariable>;
    }

    const defaultTranslation = useMemo(() => { return ctx?.translate(id) || children; }, [children, id]);

    const completeBranches = useMemo(() => {
        if (!id) {
            return { ...branches, ranges };
        } else {
            const t = (innerID: string) => ctx.translate(`${id}.${innerID}`);
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
        return ((typeof n === 'number' && completeBranches) ? getNumericBranch(n, locales, completeBranches) : null) || defaultTranslation;
    }, [n, completeBranches, defaultTranslation, locales])

    const renderedChildren = useMemo(() => {
        return <RenderClientVariable variables={(typeof n === 'number') ? { n } : undefined}>{branch}</RenderClientVariable>
    }, [n, branch])

    return (
        <span>
            {renderedChildren}
        </span>
    );

};