import 'server-only';
import I18NConfiguration from '../../config/I18NConfiguration';
type GTProviderProps = {
    I18NConfig: I18NConfiguration;
    T: any;
    intl: any;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
};
export default function GTProvider({ children, T, intl, I18NConfig, locale, defaultLocale, id, dictionary, ...props }: GTProviderProps): Promise<any>;
export {};
//# sourceMappingURL=GTProvider.d.ts.map