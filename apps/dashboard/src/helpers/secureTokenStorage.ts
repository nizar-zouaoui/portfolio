/**
 * Enhanced security utilities for client-side token storage
 * Since dashboard is a pure client-side app, we implement additional security layers
 */

/**
 * XSS Protection: Sanitize token before storage
 */
export const sanitizeToken = (token: string): string => {
  // Basic sanitization to prevent XSS injection
  return token.replace(/[<>"'&]/g, "");
};

/**
 * Token validation before storage
 */
export const isValidJWTFormat = (token: string): boolean => {
  // Basic JWT format validation (3 parts separated by dots)
  const parts = token.split(".");
  return parts.length === 3 && parts.every((part) => part.length > 0);
};

/**
 * Secure token storage with validation
 */
export const setSecureToken = (
  name: string,
  token: string,
  days: number
): boolean => {
  try {
    // Validate token format
    if (!isValidJWTFormat(token)) {
      console.warn("Invalid JWT format detected");
      return false;
    }

    // Sanitize token
    const sanitizedToken = sanitizeToken(token);

    // Create secure cookie
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${name}=${sanitizedToken}; ${expires}; path=/; Secure; SameSite=Strict`;
    return true;
  } catch (error) {
    console.error("Failed to set secure token:", error);
    return false;
  }
};

/**
 * Enhanced session monitoring
 */
export const monitorSessionSecurity = () => {
  // Check for suspicious activity
  const checkForXSS = () => {
    const cookies = document.cookie;
    if (cookies.includes("<script") || cookies.includes("javascript:")) {
      console.warn("Potential XSS attempt detected in cookies");
      // Clear all auth cookies as precaution
      document.cookie =
        "AUTH_SESSION=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict";
      return false;
    }
    return true;
  };

  return {
    checkForXSS,
  };
};
