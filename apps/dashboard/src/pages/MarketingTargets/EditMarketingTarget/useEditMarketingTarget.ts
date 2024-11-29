import {
  LeanMarketingTargetDocument,
  MarketingTargetRouteTypes,
} from "@nizar-repo/marketing-targets-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import { ISelectOption } from "@nizar-repo/ui/src/components/forms/Select";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "sdks";

type EditMarketingTargetType =
  MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"];

const useEditMarketingTarget = () => {
  const { marketingTarget, categoryTitles } = useLoaderData() as {
    marketingTarget: LeanMarketingTargetDocument;
    categoryTitles: ISelectOption[];
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
      categoryIds: marketingTarget.categoryIds,
    },
    onSubmit: (data: EditMarketingTargetType) => addMarketingTarget(data),
    categoryTitles,
    isLoading,
  };
};

export default useEditMarketingTarget;
