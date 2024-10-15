import React from "react";
import Toast, { IToast } from "..";

export interface IToasts {
  toasts: IToast[];
}

const Toasts: React.FC<IToasts> = ({ toasts }) => {
  return (
    <div className="fixed bottom-8 right-8 absolute z-50 m-4 flex flex-col space-y-2">
      {toasts.map((toast) => (
        <Toast
          id={toast.id}
          key={toast.id}
          message={toast.message}
          type={toast.type}
          timer={toast.timer}
        />
      ))}
    </div>
  );
};

export default Toasts;
