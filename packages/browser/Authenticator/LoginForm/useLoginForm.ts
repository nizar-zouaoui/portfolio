import { ClassicLoginBodyType } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginForm = {
  onSubmit: SubmitHandler<ClassicLoginBodyType>;
};

const useLoginForm = ({ onSubmit }: LoginForm) => {
  const formMethods = useForm<ClassicLoginBodyType>();
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit((data) => {
      formMethods.reset();
      onSubmit(data);
    }),
  };
};

export default useLoginForm;
