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
}

const Select = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  options,
  control,
  rules,
  defaultValue,
}: ISelect<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const selectId = `${name}-select`;

  const required = rules?.required;
  return (
    <>
      {label && (
        <label
          htmlFor={selectId}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
          {required ? (
            <span className="text-red-600 dark:text-red-400"> *</span>
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
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-2.5 pr-2.5 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              {...field}
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
        <span className="text-red-600 dark:text-red-400 text-sm mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default Select;
