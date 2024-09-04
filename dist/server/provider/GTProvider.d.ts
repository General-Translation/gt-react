import 'server-only';
import I18NConfiguration from '../../config/I18NConfiguration';
export default function GTProvider({ I18NConfig, locale, defaultLocale, children, shouldStore, id, ...props }: {
    I18NConfig: I18NConfiguration;
    children: any;
    locale: string;
    defaultLocale: string;
    shouldStore: boolean;
    id?: string;
    [key: string]: any;
}): Promise<any>;
//# sourceMappingURL=GTProvider.d.ts.map