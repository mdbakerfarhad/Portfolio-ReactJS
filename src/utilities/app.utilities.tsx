// Trim and sanitize
const appType = import.meta.env.VITE_APP_TYPE?.trim().toLowerCase() || '';

// sanitized value
export const isProduction = appType === 'production';

export const isDevelopment = appType === 'development';
