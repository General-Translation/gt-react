import { NextResponse } from "next/server";
/**
 * Middleware to set a cookie based on the locale.
 * @param {NextRequest} req - The incoming request object.
 */
export default function createNextMiddleware({ defaultLocale, locales, localeRouting }?: {
    defaultLocale: string;
    locales?: string[];
    localeRouting: boolean;
}): (req: any) => NextResponse<unknown>;
//# sourceMappingURL=createNextMiddleware.d.ts.map