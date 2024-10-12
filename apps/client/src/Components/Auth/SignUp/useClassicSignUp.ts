import { SubmitHandler, useForm } from "react-hook-form";
import { ClassicSignUpBodyType } from "@nizar-repo/authenticator";
import { useAuth } from "../../../Contexts/AuthContext";

const useClassicSignUp = () => {
  const { classicSignUp, classicSignUpLoading } = useAuth();
  const onSubmit: SubmitHandler<ClassicSignUpBodyType> = async (data) => {
    await classicSignUp(data);
  };
  const formMethods = useForm<ClassicSignUpBodyType>();
  return {
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
    loading: classicSignUpLoading,
  };
};

export default useClassicSignUp;
