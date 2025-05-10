import { useState } from "react";
import useToastContext from "./Context/useToastContext";
import useOnInitialRender from "./helpers/useOnInitialRender";

const useToast = ({ id, timer }: { id: string; timer: number }) => {
  const { removeToast } = useToastContext();
  const [isExiting, setIsExiting] = useState(false);

  useOnInitialRender(() => {
    const displayTimer = setTimeout(() => {
      setIsExiting(true);
    }, timer);

    const exitTimer = setTimeout(() => {
      removeToast(id);
    }, timer + 300);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(exitTimer);
    };
  }, [timer, id, removeToast]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeToast(id);
    }, 300);
  };

  return {
    isExiting,
    handleRemove,
  };
};

export default useToast;
