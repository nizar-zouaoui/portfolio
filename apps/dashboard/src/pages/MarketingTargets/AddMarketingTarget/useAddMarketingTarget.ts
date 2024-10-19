import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Api from "sdks";
export type AddMarketingTargetProps =
  MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];

const useAddMarketingTarget = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
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
        toast({
          type: "success",
          message: "Successfully added the marketing target",
          timer: 2000,
        });
      },
      onError: (error) => {
        toast({
          type: "error",
          message: generateApiMessage(error),
          timer: 2000,
        });
      },
    }
  );
  return {
    onSubmit: (data: AddMarketingTargetProps) => addMarketingTarget(data),
    isLoading,
  };
};

export default useAddMarketingTarget;
