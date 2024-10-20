import { SubmitHandler, useForm } from "react-hook-form";
import { AddCategoryType, EditCategoryType } from ".";

type FormProps = {
  defaultValues?: EditCategoryType;
  onSubmit: SubmitHandler<AddCategoryType>;
};

const useCategoryForm = ({ defaultValues, onSubmit }: FormProps) => {
  const formMethods = useForm<
    AddCategoryType & {
      countryCode: string;
    }
  >({
    defaultValues,
  });
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export default useCategoryForm;
