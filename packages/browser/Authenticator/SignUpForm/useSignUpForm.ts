import { ClassicSignUpBodyType } from "../types";
import { SubmitHandler, useForm } from "react-hook-form";

type SignUpForm = {
  onSubmit: SubmitHandler<ClassicSignUpBodyType>;
};

const useSignUpForm = ({ onSubmit }: SignUpForm) => {
  const formMethods = useForm<ClassicSignUpBodyType>();
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit((data) => {
      formMethods.reset();
      onSubmit(data);
    }),
  };
};

export default useSignUpForm;
