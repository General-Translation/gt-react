import 'server-only';
import I18NConfiguration from '../../config/I18NConfiguration';
export default function GTProvider({ I18NConfig, locale, defaultLocale, children, shouldSave, id, ...props }: {
    I18NConfig: I18NConfiguration;
    children: any;
    locale: string;
    defaultLocale: string;
    shouldSave: boolean;
    id?: string;
    [key: string]: any;
}): Promise<any>;
//# sourceMappingURL=GTProvider.d.ts.map