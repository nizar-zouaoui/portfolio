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

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
          {required ? (
            <span className="text-red-600 dark:text-red-400"> *</span>
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
                  className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100"
                >
                  <input
                    id={optionId}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    className="text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
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
          className="text-red-600 dark:text-red-400 text-sm mt-1"
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
