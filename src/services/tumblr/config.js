// src/services/tumblr/config.js
export const TUMBLR_CONFIG = {
    API_KEY: import.meta.env.VITE_TUMBLR_API_KEY,
    BLOG_URL: import.meta.env.VITE_TUMBLR_BLOG_URL || 'peter-eloy.tumblr.com',
    API_BASE: 'https://api.tumblr.com/v2'
};