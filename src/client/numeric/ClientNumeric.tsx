'use client'

import React, { ReactNode,  useContext,  useMemo } from 'react';
import getNumericBranch, { Range } from '../../primitives/getNumericBranch';
import RenderClientVariable from '../value/RenderClientVariable';
import useLocale from '../hooks/useLocale';
import useDefaultLocale from '../hooks/useDefaultLocale';
import useGT from '../hooks/useGT';
import { GTContext } from '../ClientProvider';
import generateHash from '../../primitives/generateHash';

type NumericProps = {
    n?: number;
    id: string;
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
        if (!id) {
            generateHash(children).then(hash => {
                console.error(`<Numeric>, with children:\n\n${children}\n\nid:\n\n${hash}\n\nNo context provided. Did you mean to import the server component instead?`);
            })
        } else {
            console.error(`<Numeric>, with children:\n\n${children}\n\nid:\n\n${id}\n\nNo context provided. Did you mean to import the server component instead?`);
        }
        return <RenderClientVariable variables={(typeof n === 'number') ? { n } : undefined}>{children}</RenderClientVariable>;
    }

    const translation = useMemo(() => { return ctx?.translate(id) || children; }, [children, id]);

    const completeBranches = useMemo(() => {
        if (!id) {
            return { ...branches, ranges };
        } else {
            const t = (innerID: string) => ctx.translate(`${id}.${innerID}`);
            return { 
                zero: t('zero') || branches.zero || undefined,
                one: t('one') || branches.one || undefined,
                two: t('two') || branches.two || undefined,
                few: t('few') || branches.few || undefined,
                many: t('many') || branches.many || undefined,
                other: t('other') || branches.other || undefined,
                singular: t('singular') || branches.singular || undefined,
                dual: t('dual') || branches.dual || undefined,
                plural: t('plural') || branches.plural || undefined,
                ranges: t('ranges') || ranges || undefined,
            }
        }
    }, [branches, ranges, id])

    const locales = [useLocale(), useDefaultLocale()]; // user's language

    const branch = useMemo(() => {
        return ((typeof n === 'number' && completeBranches) ? getNumericBranch(n, locales, completeBranches) : null) || translation;
    }, [n, completeBranches, translation, locales])

    const renderedChildren = useMemo(() => {
        return <RenderClientVariable variables={(typeof n === 'number') ? { n } : undefined}>{branch}</RenderClientVariable>
    }, [n, branch])

    return (
        <span>
            {renderedChildren}
        </span>
    );

};