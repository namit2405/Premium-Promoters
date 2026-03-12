// API Configuration
// Use environment variable if available, otherwise fall back to config
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = API_URL || 'https://premium-promoters-backend.onrender.com/api';
