export default function createValueComponent({ T, getLocale, defaultLocale }: {
    T: any;
    getLocale: () => string;
    defaultLocale: string;
}): {
    ({ children, values, branches, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createValueComponent.d.ts.map