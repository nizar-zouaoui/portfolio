import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

export type ISelectOption = { value: string; label: string };

interface ISelect<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  displayName?: string;
  placeholder?: string;
  options: ISelectOption[]; // Array of options for the select
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  control: Control<TFieldValues>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  size?: "sm" | "md" | "lg";
}

const Select = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  options,
  control,
  rules,
  defaultValue,
  size = "md",
}: ISelect<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const selectId = `${name}-select`;
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

  // Enhanced select styles to match unified theme
  const selectStyles = `
    block w-full rounded-lg transition-all duration-200 border
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
      {label && (
        <label htmlFor={selectId} className={labelStyles}>
          {label}
          {required ? (
            <span className="text-error-600 dark:text-error-400"> *</span>
          ) : null}
        </label>
      )}
      <div className="relative flex items-center">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <select
              id={selectId}
              className={selectStyles}
              {...field}
              aria-describedby={errors[name] ? `${selectId}-error` : undefined}
              aria-invalid={errors[name] ? true : false}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option, idx) => (
                <option
                  key={`${option.value}-${idx}`}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>
      {errors[name] && (
        <span
          id={`${selectId}-error`}
          className="text-error-600 dark:text-error-400 text-sm mt-1 block"
          role="alert"
          aria-live="polite"
        >
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default Select;
