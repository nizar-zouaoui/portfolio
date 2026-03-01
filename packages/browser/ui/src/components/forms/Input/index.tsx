import React, { HTMLInputTypeAttribute, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface IInput<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  displayName?: string;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  control: Control<TFieldValues>;
  type?: HTMLInputTypeAttribute;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  autoComplete?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: TFieldValues[Path<TFieldValues>]) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  helpText?: string;
}

const Input = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  rules,
  type = "text",
  defaultValue,
  autoComplete,
  leftIcon,
  rightIcon,
  onChange,
  disabled = false,
  size = "md",
  variant = "default",
  helpText,
}: IInput<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const [viewPassword, setViewPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const toggleViewPassword = () => setViewPassword(!viewPassword);

  const inputType = type === "password" && viewPassword ? "text" : type;
  const inputId = `${name}-input`;
  const required = rules?.required;
  const hasError = !!errors[name];

  // Enhanced size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  // Enhanced variant styles
  const variantStyles = {
    default:
      "border border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-800",
    filled: "border-0 bg-neutral-100 dark:bg-neutral-700",
    outlined:
      "border-2 border-neutral-300 bg-transparent dark:border-neutral-600",
  };

  // Enhanced state styles
  const getStateStyles = () => {
    if (hasError) {
      return (
        "border-error-500 bg-error-50 text-error-900 placeholder-error-400 " +
        "focus:border-error-500 focus:ring-error-500 " +
        "dark:border-error-400 dark:bg-error-900 dark:text-error-100 dark:placeholder-error-300 " +
        "dark:focus:border-error-400 dark:focus:ring-error-400"
      );
    }

    if (disabled) {
      return (
        "border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed " +
        "dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-500"
      );
    }

    return (
      "text-neutral-900 placeholder-neutral-400 " +
      "focus:border-primary-500 focus:ring-primary-500 " +
      "dark:text-neutral-100 dark:placeholder-neutral-400 " +
      "dark:focus:border-primary-400 dark:focus:ring-primary-400"
    );
  };

  const baseInputStyles =
    "block w-full rounded-lg transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-1 " +
    "disabled:cursor-not-allowed";

  const inputStyles = `
    ${baseInputStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${getStateStyles()}
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon || type === "password" ? "pr-10" : ""}
  `.trim();

  // Enhanced label styles
  const labelStyles = `
    block mb-2 text-sm font-medium transition-colors duration-200
    ${
      hasError
        ? "text-error-600 dark:text-error-400"
        : "text-neutral-700 dark:text-neutral-300"
    }
    ${isFocused && !hasError ? "text-primary-600 dark:text-primary-400" : ""}
  `.trim();

  // Eye icons for password visibility
  const EyeIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const EyeSlashIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.05 13.707M9.878 9.878l-3.29-3.29m7.532 7.532L9.878 9.878m4.242 4.242L9.878 9.878m4.242 4.242l3.29 3.29m-3.29-3.29l3.29-3.29"
      />
    </svg>
  );

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className={labelStyles}>
          {label}
          {required && (
            <span className="text-error-500 dark:text-error-400 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative flex items-center group">
        {leftIcon && (
          <span
            className={`absolute inset-y-0 left-0 pl-3 flex items-center transition-colors duration-200 ${
              hasError
                ? "text-error-400 dark:text-error-300"
                : "text-neutral-400 dark:text-neutral-500"
            } ${isFocused && !hasError ? "text-primary-500 dark:text-primary-400" : ""}`}
          >
            {leftIcon}
          </span>
        )}

        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <input
              id={inputId}
              autoComplete={autoComplete}
              className={inputStyles}
              type={inputType}
              placeholder={placeholder || ""}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e.target.value as any);
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                field.onBlur();
              }}
              disabled={disabled}
              aria-describedby={
                [
                  errors[name] ? `${inputId}-error` : null,
                  helpText ? `${inputId}-help` : null,
                ]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
              aria-invalid={hasError}
            />
          )}
        />

        {type === "password" ? (
          <button
            type="button"
            onClick={toggleViewPassword}
            className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 ${
              hasError
                ? "text-error-400 hover:text-error-500 dark:text-error-300 dark:hover:text-error-200"
                : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            } ${isFocused && !hasError ? "text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300" : ""}`}
            aria-label={viewPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {viewPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        ) : rightIcon ? (
          <span
            className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 ${
              hasError
                ? "text-error-400 dark:text-error-300"
                : "text-neutral-400 dark:text-neutral-500"
            } ${isFocused && !hasError ? "text-primary-500 dark:text-primary-400" : ""}`}
          >
            {rightIcon}
          </span>
        ) : null}
      </div>

      {/* Help text */}
      {helpText && !hasError && (
        <p
          id={`${inputId}-help`}
          className="text-xs text-neutral-500 dark:text-neutral-400"
        >
          {helpText}
        </p>
      )}

      {/* Error message */}
      {hasError && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-error-600 dark:text-error-400 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
