export default function translate<V extends Record<string, any>>(content: string, options?: {
    id?: string;
    language?: string;
    context?: string;
    [key: string]: any;
}, variables?: V, variableOptions?: {
    [key in keyof V]?: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
}): Promise<string>;
//# sourceMappingURL=translate.d.ts.map