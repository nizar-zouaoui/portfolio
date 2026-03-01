import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface RadioOption {
  label: string;
  value: string | number;
}

interface IRadioInput<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label?: string;
  options: RadioOption[];
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"
  >;
  control: Control<TFieldValues>;
  defaultValue?: TFieldValues[Path<TFieldValues>];
  direction?: "horizontal" | "vertical";
}

const RadioInput = <TFieldValues extends FieldValues>({
  name,
  label,
  options,
  rules,
  control,
  defaultValue,
  direction = "vertical",
}: IRadioInput<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const required = rules?.required;
  const inputId = `${name}-radio`;
  const hasError = !!errors[name];

  // Enhanced label styles to match unified theme
  const labelStyles = `
    block mb-2 text-sm font-medium transition-colors duration-200
    ${
      hasError
        ? "text-error-600 dark:text-error-400"
        : "text-neutral-700 dark:text-neutral-300"
    }
  `.trim();

  // Enhanced radio option styles to match unified theme
  const optionLabelStyles = `
    flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer
    ${
      hasError
        ? "text-error-600 dark:text-error-400"
        : "text-neutral-700 dark:text-neutral-300"
    }
    hover:text-primary-600 dark:hover:text-primary-400
  `.trim();

  return (
    <div className="mb-4">
      {label && (
        <label className={labelStyles}>
          {label}
          {required ? (
            <span className="text-error-600 dark:text-error-400"> *</span>
          ) : null}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <div
            className={`flex ${
              direction === "horizontal" ? "flex-row gap-4" : "flex-col"
            }`}
          >
            {options.map((option) => {
              const optionId = `${inputId}-${option.value}`;
              return (
                <label
                  key={option.value}
                  htmlFor={optionId}
                  className={optionLabelStyles}
                >
                  <input
                    id={optionId}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className={`
                      h-4 w-4 transition-colors duration-200 cursor-pointer
                      ${
                        hasError
                          ? "text-error-600 focus:ring-error-500 dark:focus:ring-error-400"
                          : "text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      }
                      bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600
                      focus:ring-2 focus:ring-offset-1 dark:ring-offset-neutral-800
                    `.trim()}
                    aria-describedby={
                      errors[name] ? `${inputId}-error` : undefined
                    }
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        )}
      />

      {errors[name] && (
        <span
          id={`${inputId}-error`}
          className="text-error-600 dark:text-error-400 text-sm mt-1 block"
          role="alert"
          aria-live="polite"
        >
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default RadioInput;
