import { useEffect, useState } from "react";
import useToastContext from "./Context/useToastContext";

const useToast = ({ id, timer }: { id: string; timer: number }) => {
  const { removeToast } = useToastContext();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const displayTimer = setTimeout(() => {
      setIsExiting(true);
    }, timer);

    const removeTimer = setTimeout(() => {
      removeToast(id);
    }, timer + 300);

    return () => {
      clearTimeout(displayTimer);
      clearTimeout(removeTimer);
    };
  }, [id, timer, removeToast]);

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
