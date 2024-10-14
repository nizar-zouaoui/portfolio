import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import Api from "../.././../sdks";
import { useNavigate } from "react-router-dom";

export type AddMarketingTargetProps =
  MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];

const useAddMarketingTarget = () => {
  const formMethods = useForm<AddMarketingTargetProps>({
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
    },
  });
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
        formMethods.reset();
        queryClient.invalidateQueries("marketing-targets");
        navigate("/marketing-targets");
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  const onSubmit: SubmitHandler<AddMarketingTargetProps> = async (data) => {
    await addMarketingTarget(data);
  };
  return {
    formMethods,
    onSubmit: formMethods.handleSubmit(onSubmit),
    isLoading,
  };
};

export default useAddMarketingTarget;
