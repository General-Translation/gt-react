import I18NConfiguration from "../../config/I18NConfiguration";
export default function createGTProviderComponent({ I18NConfig, ...metadata }: {
    I18NConfig: I18NConfiguration;
    [key: string]: any;
}): ({ children, ...props }: {
    children?: any;
    [key: string]: any;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=createGTProviderComponent.d.ts.map