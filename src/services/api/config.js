// src/services/api/config.js
import axios from 'axios';

console.debug("🔧 API configuration initialized! Chat service ready to connect to:", import.meta.env.VITE_API_URL || "localhost");
console.debug("⚙️ API timeout set to 15 seconds - patience is a virtue, but not too much patience!");

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;