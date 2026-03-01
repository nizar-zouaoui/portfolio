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
        className="unified-form-container max-w-2xl mx-auto"
      >
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Patient Information
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Please fill in the patient's details below
          </p>
        </div>

        {/* Form Fields Grid */}
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                control={formMethods.control}
                name="fullName"
                defaultValue=""
                label="Full Name"
                placeholder="Enter patient's full name"
                autoComplete="name"
                size="lg"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                rules={{
                  required: "Full Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                }}
                helpText="Enter the patient's complete legal name"
              />
            </div>

            <div>
              <Input
                control={formMethods.control}
                name="birthDate"
                label="Birth Date"
                placeholder="Select birth date"
                autoComplete="bday"
                type="date"
                size="lg"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                rules={{
                  required: "Birth Date is required",
                  validate: (value) => {
                    if (!value) return true; // Optional field
                    const birthDate = new Date(value as string);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    if (age > 150) return "Please enter a valid birth date";
                    if (birthDate > today)
                      return "Birth date cannot be in the future";
                    return true;
                  },
                }}
              />
            </div>

            <div>
              <Input
                control={formMethods.control}
                name="phoneNumber"
                defaultValue=""
                label="Phone Number"
                placeholder="Enter phone number"
                autoComplete="tel"
                type="tel"
                size="lg"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                }
                rules={{
                  required: "Phone Number is required",
                  validate: (value) =>
                    isValidNumber(`+216-${value}`) ||
                    "Please enter a valid phone number",
                }}
                helpText="Format: +216-XXXXXXXX"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                control={formMethods.control}
                name="email"
                label="Email Address"
                placeholder="Enter email address"
                autoComplete="email"
                type="email"
                size="lg"
                leftIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                rules={{
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address",
                  },
                }}
                helpText="Optional: Used for appointment notifications"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-700 mt-8">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => formMethods.reset()}
            className="w-full sm:w-auto"
          >
            Reset Form
          </Button>
          <Button
            type="submit"
            variant={loading ? "disabled" : "primary"}
            size="lg"
            loading={loading}
            disabled={loading}
            className="w-full sm:w-auto min-w-32"
            leftIcon={
              !loading && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )
            }
          >
            {loading ? "Saving..." : "Save Patient"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PatientForm;
