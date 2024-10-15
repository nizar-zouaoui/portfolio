import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?:
    | "error"
    | "warning"
    | "primary"
    | "secondary"
    | "success"
    | "disabled";
}

const Button: React.FC<IButton> = ({
  children,
  className = "",
  variant = "primary",
  ...rest
}) => {
  // Define styles for each variant
  const variantStyles = {
    primary:
      "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600",
    error:
      "bg-error-500 hover:bg-error-600 focus:ring-error-400 dark:bg-error-700 dark:hover:bg-error-800 dark:focus:ring-error-600",
    warning:
      "bg-warning-500 hover:bg-warning-600 focus:ring-warning-400 dark:bg-warning-700 dark:hover:bg-warning-800 dark:focus:ring-warning-600",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-400 dark:bg-secondary-700 dark:hover:bg-secondary-800 dark:focus:ring-secondary-600",
    success:
      "bg-success-500 hover:bg-success-600 focus:ring-success-400 dark:bg-success-700 dark:hover:bg-success-800 dark:focus:ring-success-600",
    disabled: "bg-gray-500 dark:bg-gray-500 cursor-not-allowed",
  };

  return (
    <button
      className={`${className} ${variantStyles[variant]} text-white font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
