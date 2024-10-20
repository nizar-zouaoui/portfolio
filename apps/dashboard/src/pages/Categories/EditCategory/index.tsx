import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import CategoryForm from "../Forms/CategoryForm";
import useEditMarketingTarget from "./useEditCategory";

const EditMarketingTarget = () => {
  const { defaultValues, onSubmit, isLoading } = useEditMarketingTarget();
  usePageHeaderInit({
    title: "Edit Category",
    description: "Edit Category page is destined to edit a category.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <CategoryForm
        defaultValues={defaultValues}
        loading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditMarketingTarget;
