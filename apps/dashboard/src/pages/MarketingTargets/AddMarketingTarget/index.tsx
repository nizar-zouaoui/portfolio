import React from "react";
import useAddMarketingTarget from "./useAddMarketingTarget";
import MarketingTargetForm from "../Forms/MarketingTargetForm";
import usePageHeaderInit from "../../../contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import { Button } from "@nizar-repo/ui";

const AddMarketingTarget = () => {
  const { formMethods, onSubmit, isLoading } = useAddMarketingTarget();
  usePageHeaderInit({
    title: "Create New Marketing Target",
    description:
      "Create New Marketing Target page is destined to create a new marketing target.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Button
          className="shadow-lg"
          variant={isLoading ? "disabled" : "success"}
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </>
    ),
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <MarketingTargetForm
        formMethods={formMethods}
        loading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddMarketingTarget;
