import { ReactNode } from 'react';
import I18NConfiguration from '../config/I18NConfiguration.js';
type ServerI18NProps = {
    I18NConfig: I18NConfiguration;
    children: any;
    locale: string;
    id?: string;
    [key: string]: any;
};
export default function ServerI18N({ I18NConfig, children, locale, ...props }: ServerI18NProps): Promise<ReactNode>;
export {};
//# sourceMappingURL=ServerI18N.d.ts.map