import { SubmitHandler, useForm } from "react-hook-form";
import { AuthMethods } from "@nizar-repo/auth-types";
import { ClassicLoginBodyType } from "@nizar-repo/authenticator";
import useAuth from "../../contexts/AuthContext/useAuth";

const useClassicLogin = () => {
  const { login, classicLoginLoading } = useAuth();
  const onSubmit: SubmitHandler<ClassicLoginBodyType> = async (data) => {
    await login({ authMethod: AuthMethods.CLASSIC, data });
  };
  const formMethods = useForm<ClassicLoginBodyType>();
  return {
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
    loading: classicLoginLoading,
  };
};

export default useClassicLogin;
