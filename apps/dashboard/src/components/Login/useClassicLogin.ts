import { AuthMethods } from "@nizar-repo/auth-types";
import { ClassicLoginBodyType } from "@nizar-repo/authenticator";
import useAuth from "../../contexts/AuthContext/useAuth";

const useClassicLogin = () => {
  const { login, classicLoginLoading } = useAuth();
  const onSubmit = (data: ClassicLoginBodyType) =>
    login({ authMethod: AuthMethods.CLASSIC, data });
  return {
    onSubmit,
    loading: classicLoginLoading,
  };
};

export default useClassicLogin;
