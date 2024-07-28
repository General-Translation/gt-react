export default function createNumericComponent(getLocale: () => string): {
    ({ children, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createNumericComponent.d.ts.map