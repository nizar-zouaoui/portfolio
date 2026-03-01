import { LeanActDocument } from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
import { PaginatedResult } from "@nizar-repo/shared-types/PaginationTypes";
import {
  Button,
  IBasicForm,
  Input,
  MultiSelect,
  RadioInput,
} from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import useAppointmentForm, { AddAppointmentType } from "./useAppointmentForm";

type IAppointmentFormProps = IBasicForm<AddAppointmentType> & {
  acts: PaginatedResult<LeanActDocument>;
};

const paymentStatusOptions = Object.values(PAYMENT_STATUS).map((status) => ({
  label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
  value: status,
}));

const AppointmentForm: React.FC<IAppointmentFormProps> = ({
  defaultValues,
  onSubmit,
  loading,
  acts,
}) => {
  const { formMethods, handleSubmit } = useAppointmentForm({
    defaultValues,
    onSubmit,
  });

  const actsOptions = acts.items.map((act) => ({
    label: `${act.name} - $${act.price}`,
    value: act._id.toString(),
  }));

  const [isManualConfirmedPrice, setIsManualConfirmedPrice] = useState(false);
  const isFreePaymentStatus =
    formMethods.watch("paymentStatus") === PAYMENT_STATUS.FREE;

  const isEdit = !!defaultValues;

  useEffect(() => {
    if (formMethods.control._formState.dirtyFields.acts) {
      return;
    }

    if (isFreePaymentStatus) {
      formMethods.setValue("confirmedPrice", 0);
    } else {
      const selectedActIds = formMethods.watch("acts") || [];
      const selectedActs = actsOptions.filter((act) =>
        selectedActIds.some((selectedAct) => selectedAct.id === act.value)
      );
      const totalPrice = selectedActs.reduce(
        (sum, act) => sum + parseFloat(act.label.split(" - $")[1]),
        0
      );
      formMethods.setValue("confirmedPrice", totalPrice);
    }
  }, [actsOptions, formMethods, isManualConfirmedPrice, isFreePaymentStatus]);

  useEffect(() => {
    const subscription = formMethods.watch((value, { name }) => {
      if (
        (name === "paymentStatus" &&
          value.paymentStatus !== PAYMENT_STATUS.FREE) ||
        name === "acts"
      ) {
        setIsManualConfirmedPrice(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [formMethods]);

  const { fields, append, remove } = useFieldArray({
    control: formMethods.control,
    name: "acts",
  });

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit}
        className="unified-form-container max-w-4xl mx-auto"
      >
        {/* Form Header */}
        <div className="unified-form-header">
          <Icons.Calendar className="w-8 h-8 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isEdit ? "Edit Appointment" : "Schedule New Appointment"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isEdit
                ? "Update appointment details and medical acts"
                : "Create a new patient appointment with medical procedures"}
            </p>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            {/* Date Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icons.Clock className="w-4 h-4 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Appointment Date
                </label>
              </div>
              <Input
                control={formMethods.control}
                name="date"
                displayName="Date"
                placeholder="Select appointment date"
                autoComplete="off"
                type="date"
                size="lg"
                rules={{
                  required: "Appointment date is required",
                  validate: (value) => {
                    if (typeof value === "string") {
                      const selectedDate = new Date(value);
                      const todayDate = new Date(today);
                      return (
                        selectedDate >= todayDate ||
                        "Appointment date cannot be in the past"
                      );
                    }
                    return true;
                  },
                }}
                helpText="Select the date for this appointment"
              />
            </div>

            {/* Payment Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icons.CheckCircle className="w-4 h-4 text-neutral-500" />
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Payment Status
                </label>
              </div>
              <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <RadioInput
                  control={formMethods.control}
                  name="paymentStatus"
                  label=""
                  options={paymentStatusOptions}
                  rules={{
                    required: "Payment status is required",
                  }}
                />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Choose the payment status for this appointment
              </p>
            </div>

            {/* Confirmed Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icons.XCircle className="w-4 h-4 text-neutral-500" />
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Total Cost
                </label>
              </div>
              <Input
                control={formMethods.control}
                name="confirmedPrice"
                displayName="Confirmed Price"
                placeholder="0.00"
                autoComplete="off"
                type="number"
                size="lg"
                rules={{
                  required: "Total cost is required",
                  min: {
                    value: 0,
                    message: "Cost cannot be negative",
                  },
                  max: {
                    value: 99999.99,
                    message: "Cost is too high",
                  },
                }}
                disabled={isFreePaymentStatus && !isManualConfirmedPrice}
                onChange={() => {
                  setIsManualConfirmedPrice(true);
                }}
                helpText={
                  isFreePaymentStatus
                    ? "Automatically set to $0.00 for free appointments"
                    : "Total cost will be calculated automatically based on selected acts"
                }
              />
            </div>
          </div>

          {/* Right Column - Notes and Acts */}
          <div className="space-y-6">
            {/* Notes Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icons.Document className="w-4 h-4 text-gray-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Appointment Notes
                </label>
              </div>
              <Input
                control={formMethods.control}
                name="notes"
                displayName="Notes"
                placeholder="Enter any relevant notes or observations..."
                autoComplete="off"
                type="textarea"
                size="lg"
                rules={{
                  required: "Appointment notes are required",
                  minLength: {
                    value: 10,
                    message: "Notes must be at least 10 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Notes must not exceed 1000 characters",
                  },
                }}
                helpText="Describe the patient's condition, symptoms, or treatment plan"
              />
            </div>

            {/* Medical Acts Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Icons.Heart className="w-4 h-4 text-neutral-500" />
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Medical Procedures
                </label>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 transition-all duration-200 hover:shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Procedure #{index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="error"
                        size="sm"
                        onClick={() => remove(index)}
                        className="flex items-center gap-1"
                      >
                        <Icons.Delete className="w-3 h-3" />
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                          Medical Act
                        </label>
                        <MultiSelect
                          control={formMethods.control}
                          name={`acts.${index}.id`}
                          options={actsOptions}
                          label=""
                          placeholder="Select medical act"
                          rules={{ required: "Medical act is required" }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                          Affected Teeth
                        </label>
                        <Input
                          control={formMethods.control}
                          name={`acts.${index}.teeth`}
                          displayName="Teeth"
                          placeholder="e.g., 24, 25-26"
                          size="lg"
                          rules={{
                            pattern: {
                              value: /^[\d\s\-,]+$/,
                              message:
                                "Use only numbers, spaces, hyphens, and commas",
                            },
                            maxLength: {
                              value: 50,
                              message: "Teeth notation too long",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => append({ id: "", teeth: "" })}
                  className="w-full flex items-center justify-center gap-2 border-dashed border-2"
                >
                  <Icons.Plus className="w-4 h-4" />
                  Add Medical Procedure
                </Button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add all medical procedures that will be performed during this
                appointment
              </p>
            </div>
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
            className="flex items-center gap-2"
          >
            <Icons.XCircle className="w-4 h-4" />
            Reset Form
          </Button>

          <Button
            type="submit"
            variant={loading ? "outline" : "primary"}
            size="lg"
            disabled={loading}
            className="flex items-center gap-2 min-w-[140px]"
          >
            {loading ? (
              <>
                <Icons.LoadingSpinner className="w-4 h-4" />
                {isEdit ? "Updating..." : "Scheduling..."}
              </>
            ) : (
              <>
                <Icons.Save className="w-4 h-4" />
                {isEdit ? "Update Appointment" : "Schedule Appointment"}
              </>
            )}
          </Button>
        </div>

        {/* Form Help */}
        <div className="unified-form-help">
          <Icons.InformationCircle className="w-5 h-5 text-info-500 flex-shrink-0" />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium mb-1">Appointment Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Select a future date for new appointments</li>
              <li>
                Provide detailed notes about the patient's condition or
                treatment plan
              </li>
              <li>Add all medical procedures that will be performed</li>
              <li>
                Specify affected teeth using standard dental notation (e.g., 24,
                25-26)
              </li>
              <li>
                The total cost will be calculated automatically based on
                selected procedures
              </li>
            </ul>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AppointmentForm;
