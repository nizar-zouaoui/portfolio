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
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import useAppointmentForm, { AddAppointmentType } from "./useAppointmentForm";

type IAppointmentFormProps = IBasicForm<AddAppointmentType> & {
  acts: PaginatedResult<LeanActDocument>;
};

const paymentStatusOptions = Object.values(PAYMENT_STATUS).map((status) => ({
  label: status,
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
    label: `${act.name} - ${act.price}`,
    value: act._id.toString(),
  }));

  const [isManualConfirmedPrice, setIsManualConfirmedPrice] = useState(false);
  const isFreePaymentStatus =
    formMethods.watch("paymentStatus") === PAYMENT_STATUS.FREE;

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
        (sum, act) => sum + parseFloat(act.label.split(" - ")[1]),
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
              name="date"
              displayName="Date"
              label="Date"
              placeholder="Insert date"
              autoComplete="date"
              type="date"
              rules={{
                required: "Date is required",
              }}
            />
          </div>
          <div>
            <Input
              control={formMethods.control}
              name="notes"
              displayName="Notes"
              label="Notes"
              placeholder="Insert notes"
              autoComplete="notes"
              type="textarea"
              rules={{
                required: "Notes are required",
              }}
            />
          </div>
          <div>
            <RadioInput
              control={formMethods.control}
              name="paymentStatus"
              // displayName="Payment Status"
              label="Payment Status"
              // autoComplete="paymentStatus"
              options={paymentStatusOptions}
              rules={{
                required: "Payment Status is required",
              }}
            />
          </div>
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 flex gap-4 items-end">
                <div className="flex-1">
                  <MultiSelect
                    control={formMethods.control}
                    name={`acts.${index}.id`}
                    options={actsOptions}
                    label="Act"
                    placeholder="Select act"
                    rules={{ required: "Act is required" }}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    control={formMethods.control}
                    name={`acts.${index}.teeth`}
                    label="Teeth"
                    placeholder="e.g. 24"
                  />
                </div>
                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ id: "", teeth: "" })}
              className="mt-2"
            >
              Add Act
            </Button>
          </div>
          <div>
            <Input
              control={formMethods.control}
              name="confirmedPrice"
              displayName="Confirmed Price"
              label="Confirmed Price"
              placeholder="Insert confirmed price"
              autoComplete="confirmedPrice"
              type="number"
              rules={{
                required: "Confirmed Price is required",
              }}
              disabled={isFreePaymentStatus}
              onChange={() => {
                setIsManualConfirmedPrice(true);
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

export default AppointmentForm;
