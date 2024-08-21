export default function createPluralComponent({ T, getLocale, defaultLocale }: {
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
//# sourceMappingURL=createPluralComponent.d.ts.map