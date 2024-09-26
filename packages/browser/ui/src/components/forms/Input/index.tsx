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
  name: Path<TFieldValues>; // Ensures name is a valid field within the form values
  label?: string;
  displayName?: string;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >; // Can be further typed if needed
  control: Control<TFieldValues>;
  type?: HTMLInputTypeAttribute;
  defaultValue?: TFieldValues[Path<TFieldValues>];
}

const Input = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  control,
  rules,
  type = "text", // Default to text input
  defaultValue, // Optional default value
}: IInput<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const [viewPassword, setViewPassword] = useState(false);
  const toggleViewPassword = () => setViewPassword(!viewPassword);

  // Determine whether to show password based on type and toggle state
  const inputType = type === "password" && viewPassword ? "text" : type;

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type={inputType} // Dynamically set input type based on password visibility
              placeholder={placeholder || ""}
              {...field}
            />
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleViewPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {viewPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="text-red-600 dark:text-red-400">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default Input;
