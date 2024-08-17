import React from "react";

const Code: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <code className={className}>{children}</code>;
};

export default Code;
