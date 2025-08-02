import { PageName } from "components/Layout";
import { useCallback, useEffect } from "react";
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

  const updatePageHeader = useCallback(() => {
    setTitle(title);
    setDescription(description);
    setButtons(buttons || undefined);
    setIcon(icon || undefined);
  }, [
    title,
    description,
    buttons,
    icon,
    setTitle,
    setDescription,
    setButtons,
    setIcon,
  ]);

  useEffect(() => {
    updatePageHeader();
  }, [updatePageHeader]);
};

export default usePageHeaderInit;
