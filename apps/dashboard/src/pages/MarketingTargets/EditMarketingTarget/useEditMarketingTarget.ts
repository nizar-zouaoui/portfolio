import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "../../../sdks";
import {
  LeanMarketingTargetDocument,
  MarketingTargetRouteTypes,
} from "@nizar-repo/marketing-targets-types";
import { useMutation, useQueryClient } from "react-query";

type EditMarketingTargetType =
  MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"];

const useEditMarketingTarget = () => {
  const { marketingTarget } = useLoaderData() as {
    marketingTarget: LeanMarketingTargetDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addMarketingTarget, isLoading } = useMutation(
    async (data: EditMarketingTargetType) => {
      await Api.marketingTargetsSDK.updateMarketingTargetData({
        params: { id: marketingTarget._id.toString() },
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("marketing-targets");
        navigate(-1);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return {
    defaultValues: {
      email: marketingTarget.email,
      fullName: marketingTarget.fullName,
      phoneNumber: marketingTarget.phoneNumber,
    },
    onSubmit: (data: EditMarketingTargetType) => addMarketingTarget(data),
    isLoading,
  };
};

export default useEditMarketingTarget;
