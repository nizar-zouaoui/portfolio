import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import CategoryForm from "../Forms/CategoryForm";
import useAddMarketingTarget from "./useAddCategory";

const AddMarketingTarget = () => {
  const { onSubmit, isLoading } = useAddMarketingTarget();
  usePageHeaderInit({
    title: "Create New Marketing Target",
    description:
      "Create New Marketing Target page is destined to create a new marketing target.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <CategoryForm loading={isLoading} onSubmit={onSubmit} />
    </div>
  );
};

export default AddMarketingTarget;