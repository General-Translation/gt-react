/**
 * Generates a SHA-256 hash for the given message.
 *
 * @param {any} message - The message to be hashed. This can be of any type.
 *                        If the message is an object or array, it will be
 *                        converted to a JSON string.
 * @returns {Promise<string>} A promise that resolves to the SHA-256 hash of the
 *                            message in hexadecimal format. If the message is
 *                            falsy, an empty string is returned.
 */
export default function generateHash(message: any): Promise<string>;
//# sourceMappingURL=generateHash.d.ts.map