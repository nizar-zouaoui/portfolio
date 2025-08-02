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
}: IInput<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const [viewPassword, setViewPassword] = useState(false);
  const toggleViewPassword = () => setViewPassword(!viewPassword);

  const inputType = type === "password" && viewPassword ? "text" : type;

  const inputId = `${name}-input`;
  const required = rules?.required;

  return (
    <>
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
          {required ? (
            <span className="text-red-600 dark:text-red-400"> *</span>
          ) : null}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
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
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                leftIcon ? "pl-10" : "pl-2.5"
              } ${rightIcon || type === "password" ? "pr-10" : "pr-2.5"} dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              type={inputType}
              placeholder={placeholder || ""}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e.target.value as any);
              }}
              disabled={disabled}
              aria-describedby={errors[name] ? `${inputId}-error` : undefined}
              aria-invalid={errors[name] ? true : false}
            />
          )}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={toggleViewPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            aria-label={viewPassword ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {viewPassword ? (
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
            ) : (
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
            )}
          </button>
        ) : rightIcon ? (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {errors[name] && (
        <span
          id={`${inputId}-error`}
          className="text-red-600 dark:text-red-400 text-sm mt-1"
          role="alert"
          aria-live="polite"
        >
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default Input;
