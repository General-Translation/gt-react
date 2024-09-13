export default function T({ children, id, variables, variablesOptions, n, renderSettings, ...props }: {
    children: any;
    id?: string;
    n?: number;
    variables?: Record<string, any>;
    variablesOptions?: {
        [key: string]: Intl.NumberFormatOptions | Intl.DateTimeFormatOptions;
    };
    renderSettings?: {
        method: "skeleton" | "replace" | "hang" | "subtle";
        timeout: number | null;
        fallbackToPrevious: boolean;
    };
    [key: string]: any;
}): Promise<string | number | bigint | boolean | Iterable<import("react").ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined>;
//# sourceMappingURL=T.d.ts.map