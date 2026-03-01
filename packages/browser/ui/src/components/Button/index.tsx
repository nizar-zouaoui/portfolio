import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline"
    | "ghost"
    | "disabled";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<IButton> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  disabled,
  loading = false,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  // Enhanced base styles with better accessibility and animations
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed " +
    "active:scale-95 transform " +
    "gap-2 whitespace-nowrap";

  // Enhanced size variants
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
    xl: "px-8 py-4 text-lg h-14",
  };

  // Enhanced variant styles with better contrast and accessibility
  const variantStyles = {
    primary:
      "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 " +
      "text-white focus:ring-primary-500 " +
      "shadow-sm hover:shadow-md " +
      "dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-400",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 " +
      "text-white focus:ring-secondary-500 " +
      "shadow-sm hover:shadow-md " +
      "dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-400",
    success:
      "bg-success-500 hover:bg-success-600 active:bg-success-700 " +
      "text-white focus:ring-success-500 " +
      "shadow-sm hover:shadow-md " +
      "dark:bg-success-600 dark:hover:bg-success-700 dark:focus:ring-success-400",
    warning:
      "bg-warning-500 hover:bg-warning-600 active:bg-warning-700 " +
      "text-white focus:ring-warning-500 " +
      "shadow-sm hover:shadow-md " +
      "dark:bg-warning-600 dark:hover:bg-warning-700 dark:focus:ring-warning-400",
    error:
      "bg-error-500 hover:bg-error-600 active:bg-error-700 " +
      "text-white focus:ring-error-500 " +
      "shadow-sm hover:shadow-md " +
      "dark:bg-error-600 dark:hover:bg-error-700 dark:focus:ring-error-400",
    outline:
      "border-2 border-primary-500 text-primary-500 " +
      "hover:bg-primary-50 hover:border-primary-600 " +
      "active:bg-primary-100 focus:ring-primary-500 " +
      "dark:border-primary-400 dark:text-primary-400 " +
      "dark:hover:bg-primary-900 dark:hover:border-primary-300",
    ghost:
      "text-primary-500 hover:bg-primary-50 hover:text-primary-600 " +
      "active:bg-primary-100 focus:ring-primary-500 " +
      "dark:text-primary-400 dark:hover:bg-primary-900 dark:hover:text-primary-300",
    disabled:
      "bg-neutral-300 text-neutral-500 cursor-not-allowed " +
      "dark:bg-neutral-600 dark:text-neutral-400",
  };

  const isDisabled = disabled || variant === "disabled" || loading;

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon && (
        <span className="flex items-center flex-shrink-0">{leftIcon}</span>
      )}
      <span
        className={`flex items-center gap-2 ${loading ? "opacity-70" : ""}`}
      >
        {children}
      </span>
      {!loading && rightIcon && (
        <span className="flex items-center flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};

export default Button;
