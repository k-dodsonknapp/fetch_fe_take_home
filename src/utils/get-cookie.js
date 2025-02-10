/**
 * Function that parses available cookies and returns specified cookie based on a string parameter.
 * @param {*} name 
 * @returns cookie string
 */

export default function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

