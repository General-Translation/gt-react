export default interface GTInterface {
    /** React component for internationalization */
    I18N: React.ComponentType<any>;
    /** Internationalization function */
    intl: (key: string, options?: Record<string, any>) => Promise<string>;
    /** Provider component for GlobalThis */
    GTProvider: React.ComponentType<any>;
    /** Translation function */
    t: (key: string, options?: Record<string, any>) => any;
    /** Dictionary function */
    dict: (key: string) => any;
    /** Component for rendering localized values */
    Value: React.ComponentType<any>;
    /** Component for rendering localized numeric values */
    Numeric: React.ComponentType<any>;
    /** Component for rendering variables */
    Variable: React.ComponentType<any>;
    /** Component for rendering number variables */
    NumberVariable: React.ComponentType<any>;
    /** Component for rendering date variables */
    DateVariable: React.ComponentType<any>;
    /** Component for rendering currency variables */
    CurrencyVariable: React.ComponentType<any>;
    /** Function to get the current locale */
    getLocale: () => string;
    /** Function to get the default locale */
    getDefaultLocale: () => string;
}
//# sourceMappingURL=GTInterface.d.ts.map