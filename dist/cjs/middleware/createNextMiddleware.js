"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNextMiddleware;
const generaltranslation_1 = require("generaltranslation");
const imports_1 = require("../next/imports/imports");
const cookieSettings_1 = require("./cookieSettings");
/**
 * Extracts the locale from the given pathname.
 *
 * @param {string} pathname - The pathname to extract from.
 * @returns {string} The extracted locale.
 */
function extractLocale(pathname) {
    const matches = pathname.match(/^\/([^\/]+)(?:\/|$)/);
    return matches ? matches[1] : null;
}
/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 * via
 */
function applyNewCookies(req, res) {
    const NextResponse = (0, imports_1.getNextResponse)();
    if (!NextResponse)
        return;
    const ResponseCookies = (0, imports_1.getNextResponseCookies)();
    if (!ResponseCookies)
        return;
    const RequestCookies = (0, imports_1.getNextRequestCookies)();
    if (!RequestCookies)
        return;
    // 1. Parse Set-Cookie header from the response
    const setCookies = new ResponseCookies(res.headers);
    // 2. Construct updated Cookie header for the request
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
    // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
    //    on a dummy response
    // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
    const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });
    // 4. Copy the “request header overrides” headers from our dummy response to the real response
    dummyRes.headers.forEach((value, key) => {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            res.headers.set(key, value);
        }
    });
}
/**
 * Middleware to set a cookie based on the locale.
 * @param {NextRequest} req - The incoming request object.
 */
function createNextMiddleware({ defaultLocale = 'en', approvedLocales, localeRouting = true } = { defaultLocale: 'en', localeRouting: true }) {
    return (req) => {
        var _a, _b;
        const NextResponse = (0, imports_1.getNextResponse)();
        if (!NextResponse)
            return;
        const headers = (0, imports_1.getNextHeaders)();
        if (!headers)
            return;
        const headerList = headers();
        const res = NextResponse.next();
        let userLocale = defaultLocale;
        if (localeRouting) {
            // Check if there is any supported locale in the pathname
            const { pathname } = req.nextUrl;
            const locale = extractLocale(pathname);
            let pathnameHasLocale = false;
            if (locale) {
                if (approvedLocales) {
                    for (const approvedLocale of approvedLocales) {
                        if ((0, generaltranslation_1.isSameLanguage)(approvedLocale, locale)) {
                            userLocale = approvedLocale;
                            pathnameHasLocale = true;
                            break;
                        }
                    }
                }
                else {
                    if ((0, generaltranslation_1.isValidLanguageCode)(locale)) {
                        userLocale = locale;
                        pathnameHasLocale = true;
                    }
                }
            }
            if (pathnameHasLocale) {
                res.cookies.set(cookieSettings_1.localeCookieName, userLocale);
                applyNewCookies(req, res);
                return res;
            }
            // If there's no locale, try to get one from the referer
            const referer = headerList.get('referer');
            if (referer && typeof referer === 'string') {
                const refererLocale = extractLocale((_a = (new URL(referer))) === null || _a === void 0 ? void 0 : _a.pathname);
                if (refererLocale) {
                    let refererLocaleIsValid = false;
                    if (approvedLocales) {
                        for (const approvedLocale of approvedLocales) {
                            if ((0, generaltranslation_1.isSameLanguage)(approvedLocale, refererLocale)) {
                                userLocale = approvedLocale;
                                refererLocaleIsValid = true;
                                break;
                            }
                        }
                    }
                    else {
                        if ((0, generaltranslation_1.isValidLanguageCode)(refererLocale)) {
                            userLocale = refererLocale;
                            refererLocaleIsValid = true;
                        }
                    }
                    if (refererLocaleIsValid) {
                        req.nextUrl.pathname = `/${userLocale}/${pathname}`;
                        applyNewCookies(req, res);
                        return NextResponse.redirect(req.nextUrl);
                    }
                }
            }
        }
        const acceptedLocales = (_b = headerList.get('accept-language')) === null || _b === void 0 ? void 0 : _b.split(',').map(item => { var _a; return (_a = item.split(';')) === null || _a === void 0 ? void 0 : _a[0].trim(); });
        if (acceptedLocales && acceptedLocales.length > 0) {
            if (approvedLocales) {
                for (const locale of acceptedLocales) {
                    for (const approvedLocale of approvedLocales) {
                        if ((0, generaltranslation_1.isSameLanguage)(locale, approvedLocale)) {
                            userLocale = approvedLocale;
                            break;
                        }
                    }
                }
            }
            else {
                userLocale = acceptedLocales[0];
            }
        }
        res.cookies.set(cookieSettings_1.localeCookieName, userLocale);
        if (localeRouting) {
            const { pathname } = req.nextUrl;
            // Redirect if there is no locale
            req.nextUrl.pathname = `/${userLocale}${pathname}`;
            // e.g. incoming request is /products
            // The new URL is now /en-US/products
            applyNewCookies(req, res);
            return NextResponse.redirect(req.nextUrl);
        }
        applyNewCookies(req, res);
        return res;
    };
}
//# sourceMappingURL=createNextMiddleware.js.map