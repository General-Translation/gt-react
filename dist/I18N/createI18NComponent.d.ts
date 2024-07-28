import I18NConfiguration from "../config/I18NConfiguration";
export default function createI18NComponent({ I18NConfig, getLocale, ...metadata }: {
    I18NConfig: I18NConfiguration;
    [key: string]: any;
}): ({ children, ...props }: {
    children?: any;
    [key: string]: any;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=createI18NComponent.d.ts.map