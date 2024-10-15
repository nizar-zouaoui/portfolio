import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import useAuth from "../../contexts/AuthContext/useAuth";

const useLayout = () => {
  const { isAuthenticated } = useAuth();
  const { toasts } = useToastContext();
  return {
    isAuthenticated,
    toasts,
  };
};

export default useLayout;
