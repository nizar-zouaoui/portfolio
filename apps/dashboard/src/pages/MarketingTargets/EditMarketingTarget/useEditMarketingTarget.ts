import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "../../../sdks";
import {
  LeanMarketingTargetDocument,
  MarketingTargetRouteTypes,
} from "@nizar-repo/marketing-targets-types";
import { useMutation, useQueryClient } from "react-query";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "../../../helpers/generateApiMessage";

type EditMarketingTargetType =
  MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"];

const useEditMarketingTarget = () => {
  const { marketingTarget } = useLoaderData() as {
    marketingTarget: LeanMarketingTargetDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
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
        toast({
          type: "success",
          message: "Successfully updated the marketing target",
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
