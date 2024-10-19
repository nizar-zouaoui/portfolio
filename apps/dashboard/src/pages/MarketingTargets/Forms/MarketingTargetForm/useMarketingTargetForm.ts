import { SubmitHandler, useForm } from "react-hook-form";
import { AddMarketingTargetType, EditMarketingTargetType } from ".";
import { isValidNumber } from "libphonenumber-js";

type FormProps = {
  defaultValues?: EditMarketingTargetType;
  onSubmit: SubmitHandler<AddMarketingTargetType>;
};

const useMarketingTargetForm = ({ defaultValues, onSubmit }: FormProps) => {
  const isPhoneNumber = isValidNumber(defaultValues?.phoneNumber || "");

  const formMethods = useForm<AddMarketingTargetType>({
    defaultValues: {
      ...defaultValues,
      countryCode: isPhoneNumber
        ? defaultValues?.phoneNumber?.split("-")[0].replace("+", "")
        : "91",
      phoneNumber: isPhoneNumber
        ? defaultValues?.phoneNumber?.split("-")[1]
        : undefined,
    },
  });
  return {
    formMethods,
    handleSubmit: formMethods.handleSubmit((data) => {
      const phoneNumber = `+${data.countryCode}-${data.phoneNumber}`;

      // @ts-expect-error countryCode is not part of AddMarketingTargetType
      delete data.countryCode;

      onSubmit({
        ...data,
        phoneNumber,
      });
    }),
  };
};

export default useMarketingTargetForm;
