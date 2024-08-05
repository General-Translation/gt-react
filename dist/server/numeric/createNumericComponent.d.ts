export default function createNumericComponent({ T, getLocale, defaultLocale }: {
    T: any;
    getLocale: () => string;
    defaultLocale: string;
}): {
    ({ children, n, ranges, zero, one, two, few, many, other, singular, dual, plural, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createNumericComponent.d.ts.map