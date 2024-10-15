import { useDarkMode } from "@nizar-repo/ui";
import React from "react";
import DarkModeIcon from "./DarkModeIcon";
import LighModeIcon from "./LightModeIcon";
import SystemModeIcon from "./SystemModeIcon";

const DarkMode = () => {
  const { theme, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative">
      <div
        onClick={toggleDarkMode}
        className="mr-3 flex h-10 w-10 cursor-pointer rounded-full text-sm focus:ring-4 md:mr-0"
      >
        {(() => {
          switch (theme) {
            case "light":
              return (
                <LighModeIcon className="m-auto h-5 w-5 fill-slate-100 stroke-slate-100" />
              );
            case "system":
              return (
                <SystemModeIcon className="m-auto h-5 w-5 fill-slate-100 stroke-slate-100" />
              );
            default:
              return (
                <DarkModeIcon className="m-auto h-5 w-5 fill-slate-100 stroke-slate-100" />
              );
          }
        })()}
      </div>
    </div>
  );
};

export default DarkMode;
