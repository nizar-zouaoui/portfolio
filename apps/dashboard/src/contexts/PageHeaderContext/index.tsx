import { PageName } from "../../components/Layout";
import React, { createContext, ReactNode, useState } from "react";

export type PageHeaderContextType = {
  title: PageName;
  description: string;
  buttons?: ReactNode;
  icon?: ReactNode;
  setTitle: React.Dispatch<React.SetStateAction<PageName>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setButtons: React.Dispatch<React.SetStateAction<ReactNode>>;
  setIcon: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export const PageHeaderContext = createContext<
  PageHeaderContextType | undefined
>(undefined);

export const PageHeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<PageName>("Simple Deliver");
  const [description, setDescription] = useState<string>("");
  const [buttons, setButtons] = useState<ReactNode>();
  const [icon, setIcon] = useState<ReactNode>();
  return (
    <PageHeaderContext.Provider
      value={{
        title,
        description,
        buttons,
        setTitle,
        setDescription,
        setButtons,
        icon,
        setIcon,
      }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};
