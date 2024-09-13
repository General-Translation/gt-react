import { isValidLanguageCode, isSameLanguage, determineLanguage } from "generaltranslation";
import { headers } from 'next/headers'
import { NextResponse } from "next/server";
import { primitives } from 'gt-react/internal'
import { ResponseCookies, RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
/**
 * Extracts the locale from the given pathname.
 * 
 * @param {string} pathname - The pathname to extract from.
 * @returns {string} The extracted locale.
 */
function extractLocale(pathname: string): string | null {
    const matches = pathname.match(/^\/([^\/]+)(?:\/|$)/);
    return matches ? matches[1] : null;
}

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 * via 
 */
function applyNewCookies(req: any, res: any) {

    // 1. Parse Set-Cookie header from the response
    const setCookies = new ResponseCookies(res.headers);
  
    // 2. Construct updated Cookie header for the request
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie: any) => newReqCookies.set(cookie));
  
    // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
    //    on a dummy response
    // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
    const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });
  
    // 4. Copy the “request header overrides” headers from our dummy response to the real response
    dummyRes.headers.forEach((value: any, key: any) => {
      if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
        res.headers.set(key, value);
      }
    });
}

/**
 * Middleware to set a cookie based on the locale.
 * @param {NextRequest} req - The incoming request object.
 */
export default function createNextMiddleware({
    defaultLocale = 'en', locales, localeRouting = true
}: { defaultLocale: string; locales?: string[]; localeRouting: boolean } 
= { defaultLocale: 'en', localeRouting: true }) {

    return (req: any) => {

        const headerList = headers();

        const res = NextResponse.next();

        let userLocale = defaultLocale;

        if (localeRouting) {
            
            // Check if there is any supported locale in the pathname
            const { pathname } = req.nextUrl

            const locale = extractLocale(pathname);

            let pathnameHasLocale: boolean = false;
        
            if (locale && isValidLanguageCode(locale)) {
                if (locales) {
                    const approvedLocale = determineLanguage(locale, locales);
                    if (approvedLocale) {
                        userLocale = approvedLocale;
                        pathnameHasLocale = true;
                    }
                } else {
                    userLocale = locale;
                    pathnameHasLocale = true;
                }
            }

            if (pathnameHasLocale) {
                res.cookies.set(primitives.localeCookieName, userLocale)
                applyNewCookies(req, res);
                return res;
            }

            // If there's no locale, try to get one from the referer
            const referer = headerList.get('referer')

            if (referer && typeof referer === 'string') {
                const refererLocale = extractLocale((new URL(referer))?.pathname);
                if (refererLocale) {
                    let refererLocaleIsValid = false;
                    if (locales) {
                        const approvedLocale = determineLanguage(refererLocale, locales);
                        if (approvedLocale) {
                            userLocale = approvedLocale;
                            refererLocaleIsValid = true;
                        }
                    } else {
                        if (isValidLanguageCode(refererLocale)) {
                            userLocale = refererLocale;
                            refererLocaleIsValid = true;
                        }
                    }
                    if (refererLocaleIsValid) {
                        req.nextUrl.pathname = `/${userLocale}/${pathname}`
                        applyNewCookies(req, res);
                        return NextResponse.redirect(req.nextUrl)
                    }
                }
            }

        }
        
        const acceptedLocales = headerList.get('accept-language')?.split(',').map(item => item.split(';')?.[0].trim())?.filter(code => isValidLanguageCode(code));
        
        if (acceptedLocales && acceptedLocales.length > 0) {
            if (locales) {
                const approvedLocale = determineLanguage(acceptedLocales, locales);
                if (approvedLocale) {
                    userLocale = approvedLocale;
                }
            }
            else {
                userLocale = acceptedLocales[0]
            }
        }

        res.cookies.set(primitives.localeCookieName, userLocale)

        if (localeRouting) {

            const { pathname } = req.nextUrl

            // Redirect if there is no locale
            req.nextUrl.pathname = `/${userLocale}${pathname}`
        
            // e.g. incoming request is /products
            // The new URL is now /en-US/products
            applyNewCookies(req, res);
            return NextResponse.redirect(req.nextUrl)

        }

        applyNewCookies(req, res);
        return res;

    }

}