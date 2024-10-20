import {
  CategoryRouteTypes,
  LeanCategoryDocument,
} from "@nizar-repo/categories-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "sdks";

type EditCategoryType = CategoryRouteTypes["/categories/:id"]["PATCH"]["body"];

const useEditCategory = () => {
  const { category } = useLoaderData() as {
    category: LeanCategoryDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addCategory, isLoading } = useMutation(
    async (data: EditCategoryType) => {
      await Api.categoriesSDK.updateCategory({
        params: { id: category._id.toString() },
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully updated the category",
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
      title: category.title,
      description: category.description,
      imgUrl: category.imgUrl,
    },
    onSubmit: (data: EditCategoryType) => addCategory(data),
    isLoading,
  };
};

export default useEditCategory;
