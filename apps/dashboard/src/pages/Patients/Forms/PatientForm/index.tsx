import { Button, IBasicForm, Input } from "@nizar-repo/ui";
import { isValidNumber } from "libphonenumber-js";
import React from "react";
import { FormProvider } from "react-hook-form";
import usePatientForm, { AddPatientType } from "./usePatientForm";
type IPatientFormProps = IBasicForm<AddPatientType>;

const PatientForm: React.FC<IPatientFormProps> = ({
  defaultValues,
  onSubmit,
  loading,
}) => {
  const { formMethods, handleSubmit } = usePatientForm({
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
              name="fullName"
              defaultValue=""
              displayName="Full Name"
              label="Full Name"
              placeholder="Insert full name"
              autoComplete="fullName"
              rules={{
                required: "Full Name is required",
              }}
            />
          </div>
          <div>
            <Input
              control={formMethods.control}
              name="birthDate"
              displayName="Birth Date"
              label="Birth Date"
              placeholder="Insert birth date"
              autoComplete="birthDate"
              type="date"
              rules={{
                required: "Birth Date is required",
              }}
            />
          </div>

          <div>
            <Input
              control={formMethods.control}
              name="phoneNumber"
              defaultValue=""
              displayName="Phone Number"
              label="Phone Number"
              placeholder="Insert phone number"
              autoComplete="phoneNumber"
              rules={{
                required: "Phone Number is required",
                validate: (value) =>
                  isValidNumber(`+216-${value}`) || "Invalid Phone Number",
              }}
            />
          </div>
          <div>
            <Input
              control={formMethods.control}
              name="email"
              displayName="Email"
              label="Email"
              placeholder="Your email"
              autoComplete="email"
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
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

export default PatientForm;
