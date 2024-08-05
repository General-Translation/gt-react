import { ReactNode } from 'react';
import I18NConfiguration from '../config/I18NConfiguration';
type ServerTProps = {
    I18NConfig: I18NConfiguration;
    children: any;
    locale: string;
    id?: string;
    [key: string]: any;
};
declare const ServerT: {
    ({ I18NConfig, children, locale, ...props }: ServerTProps): Promise<ReactNode>;
    gtTransformation: string;
};
export default ServerT;
//# sourceMappingURL=T.d.ts.map