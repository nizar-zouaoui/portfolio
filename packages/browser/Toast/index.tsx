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
          ? "border-green-500 bg-green-100"
          : type === "error"
            ? "border-red-500 bg-red-100"
            : "border-yellow-500 bg-yellow-100"
      } ${isExiting ? "toast-exit" : "toast-enter"}`}
    >
      {message}
      <button onClick={handleRemove} className="absolute top-0 right-0 p-2">
        &#215;
      </button>
      <div
        className="absolute bottom-0 left-0 h-1 bg-opacity-50"
        style={{
          backgroundColor:
            type === "success" ? "green" : type === "error" ? "red" : "yellow",
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
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes pop-out {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(0.9); opacity: 0; }
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
