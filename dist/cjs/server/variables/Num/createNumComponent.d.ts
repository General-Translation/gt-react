export default function createNumComponent(getLocale: () => string, defaultLocale: string): {
    ({ children, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createNumComponent.d.ts.map