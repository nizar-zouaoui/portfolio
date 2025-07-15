import { LeanActDocument } from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
import { PaginatedResult } from "@nizar-repo/shared-types/PaginationTypes";
import { Button, IBasicForm, Input, RadioInput, Select } from "@nizar-repo/ui";
import { FormProvider } from "react-hook-form";
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
    label: act.name,
    value: act._id.toString(),
  }));
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
            <Select
              control={formMethods.control}
              name="actId"
              options={actsOptions}
              displayName="Act"
              label="Act"
              placeholder="Select act"
              rules={{
                required: "Act is required",
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
