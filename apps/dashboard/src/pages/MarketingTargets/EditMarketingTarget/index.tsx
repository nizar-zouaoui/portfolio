import { FaUsers } from "react-icons/fa";
import usePageHeaderInit from "../../../contexts/PageHeaderContext/usePageHeaderInit";
import React from "react";
import useEditMarketingTarget from "./useEditMarketingTarget";
import MarketingTargetForm from "../Forms/MarketingTargetForm";

const EditMarketingTarget = () => {
  const { defaultValues, onSubmit, isLoading } = useEditMarketingTarget();
  usePageHeaderInit({
    title: "Edit Marketing Target",
    description:
      "Edit Marketing Target page is destined to edit a marketing target.",
    icon: <FaUsers />,
    // buttons: (
    //     <>
    //         <Button
    //             className="shadow-lg"
    //             variant={isLoading ? "disabled" : "success"}
    //             type="button"
    //             onClick={onSubmit}
    //             disabled={isLoading}
    //         >
    //             {isLoading ? "Submitting..." : "Submit"}
    //         </Button>
    //     </>
    // ),
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
