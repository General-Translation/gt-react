export default function createValueComponent(getLocale: () => string): {
    ({ children, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createValueComponent.d.ts.map