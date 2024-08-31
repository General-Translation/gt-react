"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextHeaders = getNextHeaders;
exports.getNextCookies = getNextCookies;
exports.getNextResponse = getNextResponse;
exports.getNextRequestCookies = getNextRequestCookies;
exports.getNextResponseCookies = getNextResponseCookies;
var cookies = null;
var headers = null;
/**
 * Load the 'next/headers' module
 */
function loadNextHeaders() {
    try {
        if (!headers || !cookies) {
            var nextHeaders = require('next/headers');
            headers = nextHeaders.headers;
            cookies = nextHeaders.cookies;
        }
    }
    catch (error) {
        console.warn('next/headers is not available. Running in non-Next.js environment.');
    }
}
function getNextHeaders() {
    if (!headers)
        loadNextHeaders();
    return headers;
}
function getNextCookies() {
    if (!cookies)
        loadNextHeaders();
    return cookies;
}
//
var NextResponse = null;
/**
 * Load the 'next/server' module
 */
function loadNextServer() {
    try {
        if (!NextResponse) {
            var server = require('next/server');
            NextResponse = server.NextResponse;
        }
    }
    catch (error) {
        console.warn('next/server is not available. Running in non-Next.js environment.');
    }
}
function getNextResponse() {
    if (!NextResponse)
        loadNextServer();
    return NextResponse;
}
//
var ResponseCookies = null;
var RequestCookies = null;
/**
 * Load the 'next/dist/server/web/spec-extension/cookies' module
 */
function loadNextSpecExtensionCookies() {
    try {
        if (!ResponseCookies) {
            var cookies_1 = require('next/dist/server/web/spec-extension/cookies');
            ResponseCookies = cookies_1.ResponseCookies;
            RequestCookies = cookies_1.RequestCookies;
        }
    }
    catch (error) {
        console.warn('next/server is not available. Running in non-Next.js environment.');
    }
}
function getNextRequestCookies() {
    if (!RequestCookies)
        loadNextSpecExtensionCookies();
    return RequestCookies;
}
function getNextResponseCookies() {
    if (!ResponseCookies)
        loadNextSpecExtensionCookies();
    return ResponseCookies;
}
//# sourceMappingURL=imports.js.map