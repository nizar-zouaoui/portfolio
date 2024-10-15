import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { useMutation, useQueryClient } from "react-query";
import Api from "../.././../sdks";
import { useNavigate } from "react-router-dom";

export type AddMarketingTargetProps =
  MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];

const useAddMarketingTarget = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addMarketingTarget, isLoading } = useMutation(
    async (data: AddMarketingTargetProps) => {
      await Api.marketingTargetsSDK.addMarketingTargetData({
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
    onSubmit: (data: AddMarketingTargetProps) => addMarketingTarget(data),
    isLoading,
  };
};

export default useAddMarketingTarget;
