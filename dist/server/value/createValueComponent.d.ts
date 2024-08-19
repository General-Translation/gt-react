export default function createValueComponent({ T, getLocale, defaultLocale }: {
    T?: any;
    getLocale: () => string;
    defaultLocale: string;
}): {
    ({ children, values, ...props }: {
        children?: any;
        values: Record<string, any>;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createValueComponent.d.ts.map