import {
  DeepMap,
  DeepPartial,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

export const omitUnchangedFormFields = <TFieldValues extends FieldValues>(
  dirtyFields: Partial<DeepMap<DeepPartial<TFieldValues>, boolean>>,
  onSubmit: SubmitHandler<TFieldValues>
): SubmitHandler<TFieldValues> => {
  return (data: TFieldValues) => {
    const changedFields = Object.keys(dirtyFields) as Array<keyof TFieldValues>;
    const changedData = changedFields.reduce((acc, field) => {
      acc[field] = data[field];
      return acc;
    }, {} as TFieldValues);

    onSubmit(changedData);
  };
};
