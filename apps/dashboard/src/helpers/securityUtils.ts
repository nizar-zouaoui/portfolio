/**
 * Safely sanitizes image URLs to prevent XSS attacks
 * @param url - The image URL to sanitize
 * @returns Sanitized URL or placeholder if invalid
 */
export const isSanitizedImageUrl = (
  url: string | undefined | null,
): boolean => {
  if (!url) {
    return false;
  }

  try {
    const urlObj = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return false;
    }

    return true;
  } catch {
    // Invalid URL format
    return false;
  }
};

export const sanitizeImageUrl = (url: string | undefined | null): string => {
  // Return placeholder for null/undefined
  if (!url) {
    return "/dashboard/placeholder-image.svg";
  }

  try {
    const urlObj = new URL(url);

    // Only allow http/https protocols
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return "/dashboard/placeholder-image.svg";
    }

    return url;
  } catch {
    // Invalid URL format
    return "/dashboard/placeholder-image.svg";
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
