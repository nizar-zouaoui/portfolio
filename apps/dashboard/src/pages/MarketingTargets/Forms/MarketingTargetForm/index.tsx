import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import countryCodes from "./countryCodes.json";

import { Button, IBasicForm, Input, Select } from "@nizar-repo/ui";
import { isValidNumber } from "libphonenumber-js";
import React from "react";
import { FormProvider } from "react-hook-form";
import useMarketingTargetForm from "./useMarketingTargetForm";
export type AddMarketingTargetType =
  MarketingTargetRouteTypes["/marketing-targets/"]["POST"]["body"];

export type EditMarketingTargetType =
  MarketingTargetRouteTypes["/marketing-targets/:id"]["PATCH"]["body"];
type IMarketingTargetFormProps = IBasicForm<AddMarketingTargetType>;

const MarketingTargetForm: React.FC<IMarketingTargetFormProps> = ({
  defaultValues,
  onSubmit,
  loading,
}) => {
  const { formMethods, handleSubmit } = useMarketingTargetForm({
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
              name="email"
              defaultValue=""
              displayName="Email"
              label="Email"
              placeholder="Your email"
              autoComplete="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
            />
          </div>

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

          <div className="flex space-x-2">
            <div>
              <Select
                control={formMethods.control}
                name="countryCode"
                options={countryCodes}
                displayName="Country code"
                label="Country code"
                placeholder="Select country code"
                rules={{
                  required: "Country code is required",
                }}
              />
            </div>
            <div className="flex-grow">
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
                    isValidNumber(
                      `+${formMethods.getValues("countryCode")}-${value}`
                    ) || "Invalid Phone Number",
                }}
              />
            </div>
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

export default MarketingTargetForm;
