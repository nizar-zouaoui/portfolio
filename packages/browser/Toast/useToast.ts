import { useEffect, useRef, useState } from "react";
import useToastContext from "./Context/useToastContext";
import useOnInitialRender from "./helpers/useOnInitialRender";
import { TimerManager } from "./utils/secureUtils";

const useToast = ({ id, timer }: { id: string; timer: number }) => {
  const { removeToast } = useToastContext();
  const [isExiting, setIsExiting] = useState(false);
  const timerManagerRef = useRef<TimerManager>();

  // Initialize timer manager
  if (!timerManagerRef.current) {
    timerManagerRef.current = new TimerManager();
  }

  useOnInitialRender(() => {
    const timerManager = timerManagerRef.current!;

    const displayTimer = timerManager.setTimeout(() => {
      setIsExiting(true);
    }, timer);

    const exitTimer = timerManager.setTimeout(() => {
      removeToast(id);
    }, timer + 300);

    return () => {
      timerManager.clearTimeout(displayTimer);
      timerManager.clearTimeout(exitTimer);
    };
  }, [timer, id, removeToast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timerManagerRef.current?.cleanup();
    };
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    timerManagerRef.current?.setTimeout(() => {
      removeToast(id);
    }, 300);
  };

  return {
    isExiting,
    handleRemove,
  };
};

export default useToast;
