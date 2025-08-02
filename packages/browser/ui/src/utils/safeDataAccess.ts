/**
 * Safe object property access utilities
 */

/**
 * Safely gets a value from an object using a dot-notation path
 * Prevents prototype pollution and unsafe property access
 */
export function safeGetValueByPath(obj: any, path: string): any {
  if (!obj || typeof obj !== "object" || !path || typeof path !== "string") {
    return undefined;
  }

  // Sanitize the path to prevent prototype pollution
  const sanitizedPath = path
    .replace(/\[(\w+)\]/g, ".$1") // Convert array notation to dot notation
    .replace(/^\./, "") // Remove leading dot
    .split(".")
    .filter((key) => {
      // Filter out dangerous keys
      return (
        key &&
        key !== "__proto__" &&
        key !== "constructor" &&
        key !== "prototype" &&
        !key.includes("__") && // Avoid dunder methods
        /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
      ); // Only allow valid property names
    });

  return sanitizedPath.reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

/**
 * Safely renders content to prevent XSS
 */
export function safeRenderContent(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    // Basic HTML escaping
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return "[Object]";
    }
  }

  return String(value);
}
