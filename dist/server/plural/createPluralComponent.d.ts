export default function createPluralComponent(T: any, getLocale: () => string, defaultLocale: string): {
    ({ children, n, ranges, zero, one, two, few, many, other, singular, dual, plural, values, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createPluralComponent.d.ts.map