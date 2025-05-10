import { useEffect, useRef, useState } from "react";
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
}

const MultiSelect = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder = "Select values",
  options,
  control,
  rules,
  defaultValue = [],
}: IMultiSelect<TFieldValues>) => {
  const {
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const required = rules?.required;
  return (
    <>
      <div>
        {label && (
          <label
            htmlFor={`${name}-dropdown`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
            {required ? (
              <span className="text-red-600 dark:text-red-400"> *</span>
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
              className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-2.5 pr-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            >
              <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex justify-between items-center"
              >
                <span>
                  {field.value.length > 0
                    ? options
                        .filter((option) => field.value.includes(option.value))
                        .map((option) => option.label)
                        .join(", ")
                    : placeholder}
                </span>
                <span>{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <ul
                  className={`absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto z-10
                dark:bg-gray-800 dark:border-gray-600`}
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
                      className={`mx-1 my-1 px-1 py-1 cursor-pointer ${
                        field.value.includes(option.value)
                          ? "bg-slate-200 dark:bg-slate-600"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
        <span className="text-red-600 dark:text-red-400 text-sm mt-1">
          {errors[name]?.message as string}
        </span>
      )}
    </>
  );
};

export default MultiSelect;
