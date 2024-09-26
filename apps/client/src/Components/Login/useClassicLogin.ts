import { SubmitHandler, useForm } from "react-hook-form";
import { AuthMethods } from "@nizar-repo/auth-types";
import { useAuth, ClassicLoginBodyType } from "../../Contexts/AuthContext";

const useClassicLogin = () => {
  const { login, loading } = useAuth();
  const onSubmit: SubmitHandler<ClassicLoginBodyType> = async (data) => {
    await login({ authMethod: AuthMethods.CLASSIC, data });
  };
  const formMethods = useForm<ClassicLoginBodyType>();
  return { formMethods, onSubmit: formMethods.handleSubmit(onSubmit), loading };
};

export default useClassicLogin;
