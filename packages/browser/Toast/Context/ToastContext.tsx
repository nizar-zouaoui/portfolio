import React, { createContext, ReactNode, useState } from "react";
import Toasts from "../Toasts";
import { IToast } from "..";

export type ToastContextType = {
  toasts: IToast[];
  addToast: (toast: Omit<IToast, "id">) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const addToast = (toast: Omit<IToast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);
  };
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };
  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};