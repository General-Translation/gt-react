import I18NConfiguration from "../../config/I18NConfiguration";
export default function createGTProviderComponent({ I18NConfig, executeT, ...metadata }: {
    I18NConfig: I18NConfiguration;
    executeT: any;
    [key: string]: any;
}): ({ children, ...props }: {
    children?: any;
    [key: string]: any;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=createGTProviderComponent.d.ts.map