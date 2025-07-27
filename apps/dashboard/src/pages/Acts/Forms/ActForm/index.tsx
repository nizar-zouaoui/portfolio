import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import React from "react";
import { FormProvider } from "react-hook-form";
import useActForm from "./useActForm";
export type AddActType = ActRouteTypes["/acts/"]["POST"]["body"];

export type EditActType = ActRouteTypes["/acts/:id"]["PATCH"]["body"];
type IActFormProps = IBasicForm<AddActType>;

const ActForm: React.FC<IActFormProps> = ({
  defaultValues,
  onSubmit,
  loading,
}) => {
  const { formMethods, handleSubmit } = useActForm({
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
              name="name"
              defaultValue=""
              displayName="Name"
              label="Name"
              placeholder="Act name"
              autoComplete="name"
              rules={{
                required: "Name is required",
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
              name="price"
              defaultValue=""
              displayName="Price"
              label="Price"
              placeholder="Insert price"
              autoComplete="price"
              type="number"
              rules={{
                required: "Price is required",
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

export default ActForm;
