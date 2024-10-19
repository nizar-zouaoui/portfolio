import React from "react";

export interface IOption {
  value: string;
  label: string;
  children?: React.ReactNode; // Add the children prop
}

const Option: React.FC<IOption> = ({ value, label, children }) => {
  return <option value={value}>{children ? children : label}</option>;
};

export default Option;
