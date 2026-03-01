import { useCallback, useEffect, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { ISelectOption } from "../Select";

interface IMultiSelect<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: ISelectOption[];
  control: Control<TFieldValues>;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  defaultValue?: string[];
  size?: "sm" | "md" | "lg";
}

const MultiSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = "Select values",
  options,
  control,
  rules,
  defaultValue = [],
  size = "md",
}: IMultiSelect<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const required = rules?.required;
  const hasError = !!errors[name];

  // Enhanced size styles to match Input component
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-3 py-2 text-sm h-10",
    lg: "px-4 py-3 text-base h-12",
  };

  // Enhanced label styles to match unified theme
  const labelStyles = `
    block mb-2 text-sm font-medium transition-colors duration-200
    ${
      hasError
        ? "text-error-600 dark:text-error-400"
        : "text-neutral-700 dark:text-neutral-300"
    }
  `.trim();

  // Enhanced dropdown styles to match unified theme
  const dropdownStyles = `
    relative block w-full rounded-lg transition-all duration-200 cursor-pointer border
    focus:outline-none focus:ring-2 focus:ring-offset-1
    ${sizeStyles[size]}
    ${
      hasError
        ? "border-error-500 bg-error-50 text-error-900 focus:border-error-500 focus:ring-error-500 dark:border-error-400 dark:bg-error-900 dark:text-error-100 dark:focus:border-error-400 dark:focus:ring-error-400"
        : "border-neutral-300 bg-white text-neutral-900 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-primary-400 dark:focus:ring-primary-400"
    }
  `.trim();

  return (
    <>
      <div>
        {label && (
          <label htmlFor={`${name}-dropdown`} className={labelStyles}>
            {label}
            {required ? (
              <span className="text-error-600 dark:text-error-400"> *</span>
            ) : null}
          </label>
        )}
        <Controller
          name={name}
          control={control}
          // @ts-expect-error
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <div
              ref={dropdownRef}
              id={`${name}-dropdown`}
              className={dropdownStyles}
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-labelledby={label ? `${name}-label` : undefined}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }
                if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
            >
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex justify-between items-center h-full"
              >
                <div className="flex items-center flex-wrap gap-1 flex-1 min-h-0">
                  {field.value.length > 0 ? (
                    options
                      .filter((option) => field.value.includes(option.value))
                      .map((option) => (
                        <span
                          className="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100 rounded-md px-2 py-0.5 text-xs font-medium"
                          key={option.value}
                        >
                          {option.label}
                        </span>
                      ))
                  ) : (
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {placeholder}
                    </span>
                  )}
                </div>
                <span className="ml-2 flex-shrink-0">{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <ul
                  className={`absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg max-h-40 overflow-y-auto z-10 
                  ${
                    hasError
                      ? "bg-error-50 border-error-200 dark:bg-error-900 dark:border-error-700"
                      : "bg-white border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700"
                  }`}
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        const newValue = field.value.includes(option.value)
                          ? field.value.filter(
                              (val: string) => val !== option.value
                            )
                          : [...field.value, option.value];
                        field.onChange(newValue);
                      }}
                      className={`mx-1 my-1 px-3 py-2 cursor-pointer rounded transition-colors duration-200 text-sm
                      ${
                        field.value.includes(option.value)
                          ? "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={field.value.includes(option.value)}
                        onChange={() => {
                          const newValue = field.value.includes(option.value)
                            ? field.value.filter(
                                (val: string) => val !== option.value
                              )
                            : [...field.value, option.value];
                          field.onChange(newValue);
                        }}
                        className="hidden"
                      />
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
      </div>
      {errors[name] && (
        <span className="text-error-600 dark:text-error-400 text-sm mt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default MultiSelect;
