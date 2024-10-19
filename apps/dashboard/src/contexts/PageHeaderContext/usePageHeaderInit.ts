import { PageName } from "components/Layout";
import { useEffect } from "react";
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

  useEffect(() => {
    setTitle(title);
    setDescription(description);
    if (buttons) {
      setButtons(buttons);
    } else setButtons(undefined);
    if (icon) {
      setIcon(icon);
    } else setIcon(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);
};

export default usePageHeaderInit;
