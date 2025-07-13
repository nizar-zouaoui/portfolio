import React from "react";
import Toast, { IToast } from "..";

export interface IToasts {
  toasts: IToast[];
}

const Toasts: React.FC<IToasts> = ({ toasts }) => {
  return (
    <div className="bottom-8 right-8 absolute z-50 m-4 flex flex-col space-y-2">
      {toasts.map((currToast) => (
        <Toast
          id={currToast.id}
          key={currToast.id}
          message={currToast.message}
          type={currToast.type}
          timer={currToast.timer}
        />
      ))}
    </div>
  );
};

export default Toasts;
