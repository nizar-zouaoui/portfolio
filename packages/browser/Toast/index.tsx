import React from "react";
import useToast from "./useToast";

export interface IToast {
  id: string;
  message: string | React.ReactNode;
  type: "success" | "error" | "warning";
  timer: number;
}

const Toast: React.FC<IToast> = ({ id, message, timer, type }) => {
  const { handleRemove, isExiting } = useToast({ id, timer });

  return (
    <div
      className={`relative p-4 w-52 md:w-80 font-semibold shadow-md border-l-4 transition-transform transform ${
        type === "success"
          ? "border-success-500 bg-success-100 dark:border-success-400 dark:bg-success-800"
          : type === "error"
            ? "border-error-500 bg-error-100 dark:border-error-400 dark:bg-error-800"
            : "border-warning-500 bg-warning-100 dark:border-warning-400 dark:bg-warning-800"
      } ${isExiting ? "toast-exit" : "toast-enter"}`}
    >
      {message}
      <button onClick={handleRemove} className="absolute top-0 right-0 p-2">
        &#215;
      </button>
      <div
        className={`absolute bottom-0 left-0 h-1 ${
          type === "success"
            ? "bg-success-500 dark:bg-success-400"
            : type === "error"
              ? "bg-error-500 dark:bg-error-400"
              : "bg-warning-500 dark:bg-warning-400"
        }`}
        style={{
          width: "100%",
          animation: `reduce-width ${timer}ms linear forwards`,
        }}
      />
      <style>
        {`
          @keyframes reduce-width {
            from { width: 100%; }
            to { width: 0%; }
          }
          @keyframes pop-in {
            0% { transform: scale(0.9); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes pop-out {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.9); opacity: 0; }
          }
          .toast-enter {
            animation: pop-in 0.3s ease forwards;
          }
          .toast-exit {
            animation: pop-out 0.3s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Toast;
