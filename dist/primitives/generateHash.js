var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
export default function generateHash(message) {
    return __awaiter(this, void 0, void 0, function* () {
        message = JSON.stringify(message);
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = yield crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}
;
//# sourceMappingURL=generateHash.js.map