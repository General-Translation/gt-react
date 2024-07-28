import 'server-only';
import I18NConfiguration from '../config/I18NConfiguration';
type GTProviderProps = {
    I18NConfig: I18NConfiguration;
    I18N: any;
    intl: any;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
};
export default function GTProvider({ children, I18N, intl, I18NConfig, locale, defaultLocale, id, dictionary, ...props }: GTProviderProps): Promise<any>;
export {};
//# sourceMappingURL=GTProvider.d.ts.map