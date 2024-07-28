type GTContextType = {
    [key: string]: any;
};
export declare const GTContext: import("react").Context<GTContextType | undefined>;
type ClientProviderProps = {
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary: Record<string, any>;
    [key: string]: any;
};
export default function ClientProvider({ children, locale, defaultLocale, dictionary }: ClientProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ClientProvider.d.ts.map