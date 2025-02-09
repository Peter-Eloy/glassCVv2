// services/cookieService/index.jsx

const WELCOME_COOKIE_NAME = 'has_seen_welcome';
const COOKIE_DURATION_DAYS = 30;

export const CookieService = {
    // Set cookie with expiration
    setCookie: (name, value, days = COOKIE_DURATION_DAYS) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    },

    // Get cookie by name
    getCookie: (name) => {
        const cookieName = `${name}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let cookie of cookieArray) {
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return '';
    },

    // Delete cookie
    deleteCookie: (name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    },

    // Check if user has seen welcome screen
    hasSeenWelcome: () => {
        return CookieService.getCookie(WELCOME_COOKIE_NAME) === 'true';
    },

    // Mark welcome as seen
    markWelcomeAsSeen: () => {
        CookieService.setCookie(WELCOME_COOKIE_NAME, 'true', COOKIE_DURATION_DAYS);
    },

    // Reset welcome status (useful for testing)
    resetWelcomeStatus: () => {
        CookieService.deleteCookie(WELCOME_COOKIE_NAME);
    }
};

export default CookieService;