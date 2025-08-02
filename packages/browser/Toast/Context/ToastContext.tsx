import React, { createContext, ReactNode, useState } from "react";
import { IToast } from "..";
import { generateSecureId } from "../utils/secureUtils";

export type ToastContextType = {
  toasts: IToast[];
  toast: (newToast: Omit<IToast, "id">) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const toast = (newToast: Omit<IToast, "id">) => {
    const id = generateSecureId();
    setToasts((prevToasts) => [...prevToasts, { ...newToast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((currToast) => currToast.id !== id)
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        toast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
