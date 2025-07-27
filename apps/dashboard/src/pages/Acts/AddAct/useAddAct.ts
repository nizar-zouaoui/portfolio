import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Api from "sdks";
export type AddActProps = ActRouteTypes["/acts/"]["POST"]["body"];

const useAddAct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addAct, isLoading } = useMutation(
    async (data: AddActProps) => {
      await Api.medicalHistoriesSDK.addAct({
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("acts");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully added the act",
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
    onSubmit: (data: AddActProps) => addAct(data),
    isLoading,
  };
};

export default useAddAct;
