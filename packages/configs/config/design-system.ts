// Enhanced Design System Configuration
// This file contains all the design tokens and unified styling for the portfolio project

export const designSystem = {
  // Brand Colors
  colors: {
    brand: {
      primary: {
        50: "rgb(232, 240, 254)", // #e8f0fe
        100: "rgb(202, 228, 255)", // #cae4ff
        200: "rgb(155, 202, 252)", // #9bcafc
        300: "rgb(106, 161, 247)", // #6aa1f7
        400: "rgb(66, 133, 244)", // #4285f4
        500: "rgb(52, 120, 246)", // #3478f6 - Primary brand color
        600: "rgb(43, 108, 230)", // #2b6ce6
        700: "rgb(38, 92, 185)", // #265cb9
        800: "rgb(32, 78, 147)", // #204e93
        900: "rgb(26, 63, 115)", // #1a3f73
      },
      secondary: {
        50: "rgb(225, 251, 241)", // #e1fbf1
        100: "rgb(200, 245, 226)", // #c8f5e2
        200: "rgb(153, 235, 202)", // #99ebca
        300: "rgb(91, 223, 168)", // #5bdfa8
        400: "rgb(37, 211, 154)", // #25d39a
        500: "rgb(16, 185, 129)", // #10b981 - Secondary brand color
        600: "rgb(13, 153, 110)", // #0d996e
        700: "rgb(10, 124, 89)", // #0a7c59
        800: "rgb(8, 99, 71)", // #086347
        900: "rgb(6, 80, 57)", // #065039
      },
    },
    semantic: {
      success: {
        50: "rgb(227, 253, 235)", // #e3fdeb
        100: "rgb(191, 251, 212)", // #bffbd4
        200: "rgb(148, 249, 183)", // #94f9b7
        300: "rgb(96, 244, 151)", // #60f497
        400: "rgb(62, 226, 122)", // #3ee27a
        500: "rgb(37, 211, 102)", // #25d366
        600: "rgb(31, 181, 87)", // #1fb557
        700: "rgb(26, 147, 72)", // #1a9348
        800: "rgb(21, 116, 58)", // #15743a
        900: "rgb(17, 90, 45)", // #115a2d
      },
      warning: {
        50: "rgb(255, 245, 230)", // #fff5e6
        100: "rgb(254, 235, 200)", // #feebc8
        200: "rgb(253, 219, 160)", // #fdcfa0
        300: "rgb(252, 200, 119)", // #fcc877
        400: "rgb(252, 172, 53)", // #fcae35
        500: "rgb(251, 188, 5)", // #fbbc05
        600: "rgb(218, 163, 4)", // #daa304
        700: "rgb(179, 134, 3)", // #b38603
        800: "rgb(143, 107, 2)", // #8f6b02
        900: "rgb(114, 86, 2)", // #725602
      },
      error: {
        50: "rgb(255, 235, 233)", // #ffebe9
        100: "rgb(255, 214, 210)", // #ffd6d2
        200: "rgb(254, 178, 171)", // #feb2ab
        300: "rgb(251, 137, 125)", // #fb897d
        400: "rgb(245, 95, 82)", // #f55f52
        500: "rgb(234, 67, 53)", // #ea4335
        600: "rgb(202, 58, 46)", // #ca3a2e
        700: "rgb(166, 48, 38)", // #a63026
        800: "rgb(135, 40, 31)", // #87281f
        900: "rgb(107, 32, 25)", // #6b2019
      },
      info: {
        50: "rgb(232, 242, 255)", // #e8f2ff
        100: "rgb(207, 226, 252)", // #cfe2fc
        200: "rgb(166, 202, 252)", // #a6cafc
        300: "rgb(115, 171, 250)", // #73abfa
        400: "rgb(87, 152, 248)", // #5798f8
        500: "rgb(66, 133, 244)", // #4285f4
        600: "rgb(57, 113, 207)", // #3971cf
        700: "rgb(46, 91, 168)", // #2e5ba8
        800: "rgb(37, 74, 138)", // #254a8a
        900: "rgb(29, 58, 110)", // #1d3a6e
      },
    },
    neutral: {
      50: "rgb(249, 250, 251)", // #f9fafb
      100: "rgb(243, 244, 246)", // #f3f4f6
      200: "rgb(229, 231, 235)", // #e5e7eb
      300: "rgb(209, 213, 219)", // #d1d5db
      400: "rgb(156, 163, 175)", // #9ca3af
      500: "rgb(107, 114, 128)", // #6b7280
      600: "rgb(75, 85, 99)", // #4b5563
      700: "rgb(55, 65, 81)", // #374151
      800: "rgb(31, 41, 55)", // #1f2937
      900: "rgb(17, 24, 39)", // #111827
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  // Spacing
  spacing: {
    px: "1px",
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    32: "8rem", // 128px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },

  // Shadows
  boxShadow: {
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    base: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  },

  // Animations
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // Component Styles
  components: {
    button: {
      base: "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
      sizes: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
      },
      variants: {
        primary:
          "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
        secondary:
          "bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500",
        success:
          "bg-success-500 hover:bg-success-600 text-white focus:ring-success-500",
        warning:
          "bg-warning-500 hover:bg-warning-600 text-white focus:ring-warning-500",
        error:
          "bg-error-500 hover:bg-error-600 text-white focus:ring-error-500",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
      },
    },
    input: {
      base: "block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
      sizes: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
      states: {
        default:
          "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:ring-primary-500",
        error:
          "border-error-500 bg-error-50 text-error-900 placeholder-error-400 focus:border-error-500 focus:ring-error-500",
        disabled:
          "border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed",
      },
      dark: {
        default:
          "dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-400 dark:focus:border-primary-400 dark:focus:ring-primary-400",
        error:
          "dark:border-error-400 dark:bg-error-900 dark:text-error-100 dark:placeholder-error-300 dark:focus:border-error-400 dark:focus:ring-error-400",
        disabled:
          "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500",
      },
    },
    card: {
      base: "bg-white rounded-xl shadow-sm border border-neutral-200 transition-shadow duration-200",
      hover: "hover:shadow-md",
      dark: "dark:bg-neutral-800 dark:border-neutral-700",
      padding: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    toast: {
      base: "relative rounded-lg border-l-4 shadow-lg transition-all duration-300 transform",
      sizes: {
        sm: "p-3 w-80 text-sm",
        md: "p-4 w-96 text-sm",
        lg: "p-6 w-[28rem] text-base",
      },
      variants: {
        success:
          "border-success-500 bg-success-50 text-success-800 dark:border-success-400 dark:bg-success-900 dark:text-success-100",
        warning:
          "border-warning-500 bg-warning-50 text-warning-800 dark:border-warning-400 dark:bg-warning-900 dark:text-warning-100",
        error:
          "border-error-500 bg-error-50 text-error-800 dark:border-error-400 dark:bg-error-900 dark:text-error-100",
        info: "border-info-500 bg-info-50 text-info-800 dark:border-info-400 dark:bg-info-900 dark:text-info-100",
      },
    },
  },
} as const;

export type DesignSystem = typeof designSystem;

// Utility functions for accessing design tokens
export const getColor = (path: string, fallback?: string): string => {
  const keys = path.split(".");
  let value: any = designSystem.colors;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return fallback || path;
    }
  }

  return typeof value === "string" ? value : fallback || path;
};

export const getSpacing = (size: keyof typeof designSystem.spacing): string => {
  return designSystem.spacing[size];
};

export const getFontSize = (
  size: keyof typeof designSystem.typography.fontSize
): string => {
  return designSystem.typography.fontSize[size];
};

export const getBorderRadius = (
  size: keyof typeof designSystem.borderRadius
): string => {
  return designSystem.borderRadius[size];
};

export const getShadow = (
  size: keyof typeof designSystem.boxShadow
): string => {
  return designSystem.boxShadow[size];
};

// CSS Variables generator for Tailwind CSS integration
export const generateCSSVariables = () => {
  const vars: Record<string, string> = {};

  // Generate color variables
  const processColors = (colors: any, prefix = "") => {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        processColors(value, prefix ? `${prefix}-${key}` : key);
      } else if (typeof value === "string") {
        const rgb = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgb) {
          vars[`--color-${prefix}-${key}`] = `${rgb[1]} ${rgb[2]} ${rgb[3]}`;
        }
      }
    });
  };

  processColors(designSystem.colors);
  return vars;
};
