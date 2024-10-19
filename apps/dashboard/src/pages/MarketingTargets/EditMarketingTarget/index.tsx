import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import MarketingTargetForm from "../Forms/MarketingTargetForm";
import useEditMarketingTarget from "./useEditMarketingTarget";

const EditMarketingTarget = () => {
  const { defaultValues, onSubmit, isLoading } = useEditMarketingTarget();
  usePageHeaderInit({
    title: "Edit Marketing Target",
    description:
      "Edit Marketing Target page is destined to edit a marketing target.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <MarketingTargetForm
        defaultValues={defaultValues}
        loading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditMarketingTarget;
