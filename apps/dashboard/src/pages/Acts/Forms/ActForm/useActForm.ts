import { omitUnchangedFormFields } from "helpers/omitUnchangedFormFields";
import { SubmitHandler, useForm } from "react-hook-form";
import { AddActType, EditActType } from ".";

type FormProps = {
  defaultValues?: EditActType;
  onSubmit: SubmitHandler<AddActType>;
};

const useActForm = ({ defaultValues, onSubmit }: FormProps) => {
  const formMethods = useForm<AddActType>({
    defaultValues,
  });
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit(
      omitUnchangedFormFields(formMethods.formState.dirtyFields, onSubmit)
    ),
  };
};

export default useActForm;
