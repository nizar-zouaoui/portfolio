import usePageHeader from "../../../contexts/PageHeaderContext/usePageHeader";
import React from "react";

const PageHeader = () => {
  const { title, description, buttons, icon } = usePageHeader();

  return (
    <div className="bg-slate-300 h-44 shadow-xl flex flex-col justify-center">
      <div>
        <div className="flex justify-between items-center w-11/12 mx-auto mt-8">
          <div className="flex items-center space-x-2 text-2xl font-bold flex-grow">
            {icon}
            <p>{title}</p>
          </div>

          <div className="flex items-center space-x-2 max-w-[400px] overflow-x-auto">
            {buttons ? buttons : <span className="invisible">Placeholder</span>}
          </div>
        </div>

        <div className="w-11/12 mx-auto mb-8">
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
