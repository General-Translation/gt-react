"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createNextMiddleware;
var generaltranslation_1 = require("generaltranslation");
var imports_1 = require("../next/imports/imports");
var cookieSettings_1 = require("./cookieSettings");
/**
 * Extracts the locale from the given pathname.
 *
 * @param {string} pathname - The pathname to extract from.
 * @returns {string} The extracted locale.
 */
function extractLocale(pathname) {
    var matches = pathname.match(/^\/([^\/]+)(?:\/|$)/);
    return matches ? matches[1] : null;
}
/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 * via
 */
function applyNewCookies(req, res) {
    var NextResponse = (0, imports_1.getNextResponse)();
    if (!NextResponse)
        return;
    var ResponseCookies = (0, imports_1.getNextResponseCookies)();
    if (!ResponseCookies)
        return;
    var RequestCookies = (0, imports_1.getNextRequestCookies)();
    if (!RequestCookies)
        return;
    // 1. Parse Set-Cookie header from the response
    var setCookies = new ResponseCookies(res.headers);
    // 2. Construct updated Cookie header for the request
    var newReqHeaders = new Headers(req.headers);
    var newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach(function (cookie) { return newReqCookies.set(cookie); });
    // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
    //    on a dummy response
    // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
    var dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });
    // 4. Copy the “request header overrides” headers from our dummy response to the real response
    dummyRes.headers.forEach(function (value, key) {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            res.headers.set(key, value);
        }
    });
}
/**
 * Middleware to set a cookie based on the locale.
 * @param {NextRequest} req - The incoming request object.
 */
function createNextMiddleware(_a) {
    var _b = _a === void 0 ? { defaultLocale: 'en', localeRouting: true } : _a, _c = _b.defaultLocale, defaultLocale = _c === void 0 ? 'en' : _c, approvedLocales = _b.approvedLocales, _d = _b.localeRouting, localeRouting = _d === void 0 ? true : _d;
    return function (req) {
        var _a, _b;
        var NextResponse = (0, imports_1.getNextResponse)();
        if (!NextResponse)
            return;
        var headers = (0, imports_1.getNextHeaders)();
        if (!headers)
            return;
        var headerList = headers();
        var res = NextResponse.next();
        var userLocale = defaultLocale;
        if (localeRouting) {
            // Check if there is any supported locale in the pathname
            var pathname = req.nextUrl.pathname;
            var locale = extractLocale(pathname);
            var pathnameHasLocale = false;
            if (locale && (0, generaltranslation_1.isValidLanguageCode)(locale)) {
                if (approvedLocales) {
                    for (var _i = 0, approvedLocales_1 = approvedLocales; _i < approvedLocales_1.length; _i++) {
                        var approvedLocale = approvedLocales_1[_i];
                        if ((0, generaltranslation_1.isSameLanguage)(approvedLocale, locale)) {
                            userLocale = approvedLocale;
                            pathnameHasLocale = true;
                            break;
                        }
                    }
                }
                else {
                    userLocale = locale;
                    pathnameHasLocale = true;
                }
            }
            if (pathnameHasLocale) {
                res.cookies.set(cookieSettings_1.localeCookieName, userLocale);
                applyNewCookies(req, res);
                return res;
            }
            // If there's no locale, try to get one from the referer
            var referer = headerList.get('referer');
            if (referer && typeof referer === 'string') {
                var refererLocale = extractLocale((_a = (new URL(referer))) === null || _a === void 0 ? void 0 : _a.pathname);
                if (refererLocale) {
                    var refererLocaleIsValid = false;
                    if (approvedLocales) {
                        for (var _c = 0, approvedLocales_2 = approvedLocales; _c < approvedLocales_2.length; _c++) {
                            var approvedLocale = approvedLocales_2[_c];
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
                        req.nextUrl.pathname = "/".concat(userLocale, "/").concat(pathname);
                        applyNewCookies(req, res);
                        return NextResponse.redirect(req.nextUrl);
                    }
                }
            }
        }
        var acceptedLocales = (_b = headerList.get('accept-language')) === null || _b === void 0 ? void 0 : _b.split(',').map(function (item) { var _a; return (_a = item.split(';')) === null || _a === void 0 ? void 0 : _a[0].trim(); });
        if (acceptedLocales && acceptedLocales.length > 0) {
            if (approvedLocales) {
                outerLoop: for (var _d = 0, acceptedLocales_1 = acceptedLocales; _d < acceptedLocales_1.length; _d++) {
                    var locale = acceptedLocales_1[_d];
                    for (var _e = 0, approvedLocales_3 = approvedLocales; _e < approvedLocales_3.length; _e++) {
                        var approvedLocale = approvedLocales_3[_e];
                        if ((0, generaltranslation_1.isSameLanguage)(locale, approvedLocale)) {
                            userLocale = approvedLocale;
                            break outerLoop;
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
            var pathname = req.nextUrl.pathname;
            // Redirect if there is no locale
            req.nextUrl.pathname = "/".concat(userLocale).concat(pathname);
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