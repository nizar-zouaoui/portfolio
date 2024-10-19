import { ClassicSignUpBodyType } from "@nizar-repo/authenticator";
import { useAuth } from "Contexts/AuthContext";

const useClassicSignUp = () => {
  const { classicSignUp, classicSignUpLoading } = useAuth();
  const onSubmit = async (data: ClassicSignUpBodyType) => classicSignUp(data);
  return {
    onSubmit,
    loading: classicSignUpLoading,
  };
};

export default useClassicSignUp;
