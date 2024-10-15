import { SubmitHandler, useForm } from "react-hook-form";
import { AddMarketingTargetType, EditMarketingTargetType } from ".";

type FormProps = {
  defaultValues?: EditMarketingTargetType;
  onSubmit: SubmitHandler<AddMarketingTargetType>;
};

const useMarketingTargetForm = ({ defaultValues, onSubmit }: FormProps) => {
  const formMethods = useForm<AddMarketingTargetType>({
    defaultValues,
  });
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit((data) => {
      onSubmit(data);
    }),
  };
};

export default useMarketingTargetForm;
