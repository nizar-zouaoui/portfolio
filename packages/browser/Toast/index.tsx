import React from "react";
import useToast from "./useToast";

export interface IToast {
  id: string;
  message: string | React.ReactNode;
  type: "success" | "error" | "warning" | "info";
  timer: number;
  size?: "sm" | "md" | "lg";
  closable?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

const Toast: React.FC<IToast> = ({
  id,
  message,
  timer,
  type,
  size = "md",
  closable = true,
}) => {
  const { handleRemove, isExiting } = useToast({ id, timer });

  // Enhanced size styles
  const sizeStyles = {
    sm: "p-3 w-80 text-sm",
    md: "p-4 w-96 text-sm",
    lg: "p-6 w-[28rem] text-base",
  };

  // Enhanced variant styles with better contrast and accessibility
  const variantStyles = {
    success:
      "border-success-500 bg-success-50 text-success-800 " +
      "dark:border-success-400 dark:bg-success-900 dark:text-success-100",
    error:
      "border-error-500 bg-error-50 text-error-800 " +
      "dark:border-error-400 dark:bg-error-900 dark:text-error-100",
    warning:
      "border-warning-500 bg-warning-50 text-warning-800 " +
      "dark:border-warning-400 dark:bg-warning-900 dark:text-warning-100",
    info:
      "border-info-500 bg-info-50 text-info-800 " +
      "dark:border-info-400 dark:bg-info-900 dark:text-info-100",
  };

  // Enhanced progress bar styles
  const progressBarStyles = {
    success: "bg-success-500 dark:bg-success-400",
    error: "bg-error-500 dark:bg-error-400",
    warning: "bg-warning-500 dark:bg-warning-400",
    info: "bg-info-500 dark:bg-info-400",
  };

  // Icons for different toast types
  const icons = {
    success: (
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <div
      className={`
        relative rounded-lg border-l-4 shadow-lg backdrop-blur-sm
        transition-all duration-300 transform
        ${sizeStyles[size]}
        ${variantStyles[type]}
        ${isExiting ? "toast-exit" : "toast-enter"}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="mt-0.5">{icons[type]}</div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          {typeof message === "string" ? (
            <p className="font-medium leading-relaxed">{message}</p>
          ) : (
            message
          )}
        </div>

        {/* Close button */}
        {closable && (
          <button
            onClick={handleRemove}
            className="ml-auto flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 
                       transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Enhanced progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 rounded-bl-lg ${progressBarStyles[type]}`}
        style={{
          width: "100%",
          animation: `reduce-width ${timer}ms linear forwards`,
        }}
      />

      {/* Enhanced animations */}
      <style>
        {`
          @keyframes reduce-width {
            from { width: 100%; }
            to { width: 0%; }
          }
          @keyframes toast-enter {
            0% { 
              transform: translateX(100%) scale(0.95); 
              opacity: 0; 
            }
            50% { 
              transform: translateX(0) scale(1.02); 
              opacity: 1; 
            }
            100% { 
              transform: translateX(0) scale(1); 
              opacity: 1; 
            }
          }
          @keyframes toast-exit {
            0% { 
              transform: translateX(0) scale(1); 
              opacity: 1; 
            }
            50% { 
              transform: translateX(20%) scale(0.98); 
              opacity: 0.7; 
            }
            100% { 
              transform: translateX(100%) scale(0.9); 
              opacity: 0; 
            }
          }
          .toast-enter {
            animation: toast-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .toast-exit {
            animation: toast-exit 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Toast;

// Export Toasts component
export { default as Toasts, type IToasts } from "./Toasts";
export { default as useToast } from "./useToast";
