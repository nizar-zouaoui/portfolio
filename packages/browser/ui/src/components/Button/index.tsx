import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?:
    | "soft"
    | "danger"
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
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    soft: "bg-gray-300 hover:bg-gray-400 focus:ring-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600",
    danger:
      "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800",
    warning:
      "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-700",
    secondary:
      "bg-gray-600 hover:bg-gray-700 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800",
    success:
      "bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-700",
    disabled: "bg-gray-400 cursor-not-allowed",
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
