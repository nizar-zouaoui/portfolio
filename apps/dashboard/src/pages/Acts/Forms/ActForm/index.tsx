import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
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

  const isEdit = !!defaultValues;

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit}
        className="unified-form-container max-w-2xl mx-auto"
      >
        {/* Form Header */}
        <div className="unified-form-header">
          <Icons.Heart className="w-8 h-8 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Medical Act" : "Create New Medical Act"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEdit
                ? "Update medical procedure information"
                : "Add a new medical procedure to your services"}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Act Name Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.Clipboard className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Procedure Name
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="name"
              defaultValue=""
              displayName="Name"
              placeholder="Enter procedure name (e.g., Root Canal Treatment)"
              autoComplete="off"
              size="lg"
              rules={{
                required: "Procedure name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Name must not exceed 100 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s\-().,&]+$/,
                  message:
                    "Name can only contain letters, numbers, spaces, and basic punctuation",
                },
              }}
              helpText="Official name of the medical procedure or treatment"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.Document className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Procedure Description
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="description"
              defaultValue=""
              displayName="Description"
              placeholder="Detailed description of the procedure, its purpose, and what it involves..."
              autoComplete="off"
              type="textarea"
              size="lg"
              rules={{
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                maxLength: {
                  value: 1000,
                  message: "Description must not exceed 1000 characters",
                },
              }}
              helpText="Provide a comprehensive description for patient understanding and billing purposes"
            />
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icons.CheckCircle className="w-4 h-4 text-gray-500" />
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Procedure Cost
              </label>
            </div>
            <Input
              control={formMethods.control}
              name="price"
              defaultValue=""
              displayName="Price"
              placeholder="0.00"
              autoComplete="off"
              type="number"
              size="lg"
              rules={{
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
                max: {
                  value: 99999.99,
                  message: "Price is too high",
                },
                validate: (value) => {
                  const numValue = parseFloat(String(value));
                  if (isNaN(numValue)) {
                    return "Please enter a valid price";
                  }
                  // Check for max 2 decimal places
                  if (!/^\d+(\.\d{1,2})?$/.test(String(value))) {
                    return "Price can have maximum 2 decimal places";
                  }
                  return true;
                },
              }}
              helpText="Standard price for this procedure (can be adjusted per patient)"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="unified-form-actions">
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={() => formMethods.reset()}
          >
            <Icons.XCircle className="w-4 h-4" />
            Reset
          </Button>

          <Button
            type="submit"
            variant={loading ? "outline" : "primary"}
            size="lg"
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? (
              <>
                <Icons.LoadingSpinner className="w-4 h-4" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Icons.Save className="w-4 h-4" />
                {isEdit ? "Update Act" : "Create Act"}
              </>
            )}
          </Button>
        </div>

        {/* Form Help */}
        <div className="unified-form-help">
          <Icons.InformationCircle className="w-5 h-5 text-info-500 flex-shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Medical Act Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Use clear, professional names that patients can understand
              </li>
              <li>
                Provide detailed descriptions for insurance and billing purposes
              </li>
              <li>
                Set competitive pricing based on market standards and costs
              </li>
              <li>Ensure the procedure complies with medical regulations</li>
              <li>
                Consider creating standard variations for different complexity
                levels
              </li>
            </ul>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ActForm;
