import { PageName } from "components/Layout";
import { useEffect, useRef } from "react";
import usePageHeader from "./usePageHeader";

interface PageHeaderInitProps {
  title: PageName;
  description: string;
  buttons?: React.ReactNode;
  icon?: React.ReactNode;
}

const usePageHeaderInit = ({
  title,
  description,
  buttons,
  icon,
}: PageHeaderInitProps) => {
  const { setTitle, setDescription, setButtons, setIcon } = usePageHeader();

  const buttonsRef = useRef(buttons);
  const iconRef = useRef(icon);
  buttonsRef.current = buttons;
  iconRef.current = icon;

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    setButtons(buttonsRef.current || undefined);
    setIcon(iconRef.current || undefined);
  }, [title, description, setTitle, setDescription, setButtons, setIcon]);
};

export default usePageHeaderInit;
