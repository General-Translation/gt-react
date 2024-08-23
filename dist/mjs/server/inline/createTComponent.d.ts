import I18NConfiguration from "../../config/I18NConfiguration";
export default function createTComponent({ I18NConfig, ...metadata }: {
    I18NConfig: I18NConfiguration;
    [key: string]: any;
}): {
    ({ children, ...props }: {
        children?: any;
        [key: string]: any;
    }): import("react/jsx-runtime").JSX.Element;
    gtTransformation: string;
};
//# sourceMappingURL=createTComponent.d.ts.map