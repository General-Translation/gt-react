import primitives from '../primitives/primitives';
const { localeCookieName } = primitives;

/**
 * Function to get the value of a specific cookie by its name.
 * 
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
export default function getLocaleCookie(name: string = localeCookieName): string | null {
    const cookieString = document.cookie;
    
    // Split the cookies string by "; " to get an array of "key=value" strings
    const cookiesArray = cookieString.split("; ");
    
    // Loop through the array to find the cookie with the specified name
    for (let cookie of cookiesArray) {
      const [cookieName, cookieValue] = cookie.split("=");
      
      // Check if this cookie has the name we are looking for
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    
    // If the cookie is not found, return null
    return null;
}