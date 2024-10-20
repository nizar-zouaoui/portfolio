import { CategoryRouteTypes } from "@nizar-repo/categories-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Api from "sdks";
export type AddCategoryProps =
  CategoryRouteTypes["/categories/"]["POST"]["body"];

const useAddCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addCategory, isLoading } = useMutation(
    async (data: AddCategoryProps) => {
      await Api.categoriesSDK.addCategory({
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
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
    onSubmit: (data: AddCategoryProps) => addCategory(data),
    isLoading,
  };
};

export default useAddCategory;
