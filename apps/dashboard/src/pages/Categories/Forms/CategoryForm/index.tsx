import { CategoryRouteTypes } from "@nizar-repo/categories-types";

import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import React from "react";
import { FormProvider } from "react-hook-form";
import useCategoryForm from "./useCategoryForm";
export type AddCategoryType =
  CategoryRouteTypes["/categories/"]["POST"]["body"];

export type EditCategoryType =
  CategoryRouteTypes["/categories/:id"]["PATCH"]["body"];
type ICategoryFormProps = IBasicForm<AddCategoryType>;

const CategoryForm: React.FC<ICategoryFormProps> = ({
  defaultValues,
  onSubmit,
  loading,
}) => {
  const { formMethods, handleSubmit } = useCategoryForm({
    defaultValues,
    onSubmit,
  });
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 dark:bg-slate-800 p-6 shadow-lg"
      >
        <div className="grid gap-6 mb-6">
          <div>
            <Input
              control={formMethods.control}
              name="title"
              defaultValue=""
              displayName="Title"
              label="Title"
              placeholder="Your title"
              autoComplete="title"
              rules={{
                required: "Title is required",
              }}
            />
          </div>

          <div>
            <Input
              control={formMethods.control}
              name="description"
              defaultValue=""
              displayName="Description"
              label="Description"
              placeholder="Insert description"
              autoComplete="description"
              rules={{
                required: "Description is required",
              }}
            />
          </div>

          <div>
            <Input
              control={formMethods.control}
              name="imgUrl"
              defaultValue=""
              displayName="Image Url"
              label="Image Url"
              placeholder="Insert image Url"
              autoComplete="imgUrl"
              rules={{
                validate: (value) => {
                  if (value) {
                    try {
                      new URL(value);
                      return true;
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (error) {
                      return "Invalid Image Url";
                    }
                  }
                  return true;
                },
              }}
            />
          </div>
        </div>

        <Button
          className="shadow-lg"
          variant={loading ? "disabled" : "success"}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default CategoryForm;
