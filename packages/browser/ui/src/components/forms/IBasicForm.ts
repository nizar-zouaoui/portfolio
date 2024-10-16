import { FieldValues, SubmitHandler } from "react-hook-form";

export default interface IBasicForm<T extends FieldValues> {
  defaultValues?: T;
  onSubmit: SubmitHandler<T>;
  loading: boolean;
}
