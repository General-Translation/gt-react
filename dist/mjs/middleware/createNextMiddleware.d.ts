/**
 * Middleware to set a cookie based on the locale.
 * @param {NextRequest} req - The incoming request object.
 */
export default function createNextMiddleware({ defaultLocale, approvedLocales, localeRouting }?: {
    defaultLocale: string;
    approvedLocales?: string[];
    localeRouting: boolean;
}): (req: any) => any;
//# sourceMappingURL=createNextMiddleware.d.ts.map