import {
  ActRouteTypes,
  LeanActDocument,
} from "@nizar-repo/medical-histories-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "sdks";

type EditActType = ActRouteTypes["/acts/:id"]["PATCH"]["body"];

const useEditAct = () => {
  const { act } = useLoaderData() as {
    act: LeanActDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addAct, isLoading } = useMutation(
    async (data: EditActType) => {
      await Api.medicalHistoriesSDK.updateAct({
        params: { id: act._id.toString() },
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("acts");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully updated the act",
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
    defaultValues: act,
    onSubmit: (data: EditActType) => addAct(data),
    isLoading,
  };
};

export default useEditAct;
