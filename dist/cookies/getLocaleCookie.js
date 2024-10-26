import { localeCookieName } from "../primitives/primitives";
/**
 * Function to get the value of a specific cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
export default function getLocaleCookie(name) {
    if (name === void 0) { name = localeCookieName; }
    var cookieString = document.cookie;
    // Split the cookies string by "; " to get an array of "key=value" strings
    var cookiesArray = cookieString.split("; ");
    // Loop through the array to find the cookie with the specified name
    for (var _i = 0, cookiesArray_1 = cookiesArray; _i < cookiesArray_1.length; _i++) {
        var cookie = cookiesArray_1[_i];
        var _a = cookie.split("="), cookieName = _a[0], cookieValue = _a[1];
        // Check if this cookie has the name we are looking for
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    // If the cookie is not found, return null
    return null;
}
//# sourceMappingURL=getLocaleCookie.js.map