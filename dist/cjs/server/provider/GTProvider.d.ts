import 'server-only';
import I18NConfiguration from '../../config/I18NConfiguration';
export default function GTProvider({ children, executeT, I18NConfig, locale, defaultLocale, id, dictionary, ...props }: {
    I18NConfig: I18NConfiguration;
    executeT: any;
    children: any;
    locale: string;
    defaultLocale: string;
    dictionary?: Record<string, any>;
    id?: string;
    [key: string]: any;
}): Promise<any>;
//# sourceMappingURL=GTProvider.d.ts.map