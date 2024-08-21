/**
 * Checks if the provided value is a promise.
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a promise, otherwise false.
 */
export default function isPromise(value) {
    return Boolean(value && typeof value.then === 'function' && typeof value.catch === 'function');
}
//# sourceMappingURL=isPromise.js.map