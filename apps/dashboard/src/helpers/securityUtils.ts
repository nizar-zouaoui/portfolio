/**
 * Safely sanitizes image URLs to prevent XSS attacks
 * @param url - The image URL to sanitize
 * @returns Sanitized URL or placeholder if invalid
 */
export const sanitizeImageUrl = (url: string | undefined | null): string => {
  // Return placeholder for null/undefined
  if (!url) {
    return "/placeholder-image.svg";
  }

  try {
    const urlObj = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return "/placeholder-image.svg";
    }

    return url;
  } catch {
    // Invalid URL format
    return "/placeholder-image.svg";
  }
};

/**
 * Development-only logging utility
 * @param args - Arguments to log (only in development)
 */
export const devLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};
