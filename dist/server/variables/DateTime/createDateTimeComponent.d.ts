export default function createDateTimeComponent(getLocale: () => string, defaultLocale: string): {
    ({ children, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createDateTimeComponent.d.ts.map