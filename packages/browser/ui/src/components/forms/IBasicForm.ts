import { BaseSyntheticEvent } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export default interface IBasicForm<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  loading: boolean;
}
