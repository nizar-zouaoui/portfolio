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
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-${
                leftIcon ? "10" : "2.5"
              } pr-${rightIcon || type === "password" ? "10" : "2.5"} dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              type={inputType}
              placeholder={placeholder || ""}
              {...field}
            />
          )}
        />
        {type === "password" ? (
          <button
            type="button"
            onClick={toggleViewPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 dark:text-gray-300"
          >
            {viewPassword ? "Hide" : "Show"}
          </button>
        ) : rightIcon ? (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </span>
        ) : null}
      </div>
      {errors[name] && (
        <span className="text-red-600 dark:text-red-400 text-sm mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default Input;
