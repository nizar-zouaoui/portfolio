import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { useMutation, useQueryClient } from "react-query";
import Api from "../.././../sdks";
import { useNavigate } from "react-router-dom";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "../../../helpers/generateApiMessage";
export type AddMarketingTargetProps =
  MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];

const useAddMarketingTarget = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { addToast } = useToastContext();
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
        addToast({
          type: "success",
          message: "Successfully added the marketing target",
          timer: 2000,
        });
      },
      onError: (error) => {
        addToast({
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
