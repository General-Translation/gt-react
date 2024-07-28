"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextHeaders = getNextHeaders;
exports.getNextCookies = getNextCookies;
exports.getNextResponse = getNextResponse;
exports.getNextRequestCookies = getNextRequestCookies;
exports.getNextResponseCookies = getNextResponseCookies;
let cookies = null;
let headers = null;
/**
 * Load the 'next/headers' module
 */
function loadNextHeaders() {
    try {
        if (!headers || !cookies) {
            const nextHeaders = require('next/headers');
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
let NextResponse = null;
/**
 * Load the 'next/server' module
 */
function loadNextServer() {
    try {
        if (!NextResponse) {
            const server = require('next/server');
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
let ResponseCookies = null;
let RequestCookies = null;
/**
 * Load the 'next/dist/server/web/spec-extension/cookies' module
 */
function loadNextSpecExtensionCookies() {
    try {
        if (!ResponseCookies) {
            const cookies = require('next/dist/server/web/spec-extension/cookies');
            ResponseCookies = cookies.ResponseCookies;
            RequestCookies = cookies.RequestCookies;
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