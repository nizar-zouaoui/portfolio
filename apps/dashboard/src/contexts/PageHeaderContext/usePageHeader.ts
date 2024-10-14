import { useContext } from "react";
import { PageHeaderContext } from ".";

export const usePageHeader = () => {
  const context = useContext(PageHeaderContext);
  if (context === undefined) {
    throw new Error("usePageHeader must be used within a PageHeaderProvider");
  }
  return context;
};

export default usePageHeader;
