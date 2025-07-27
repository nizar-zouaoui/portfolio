import { AppointmentRouteTypes } from "@nizar-repo/medical-histories-types";
import { omitUnchangedFormFields } from "helpers/omitUnchangedFormFields";
import { SubmitHandler, useForm } from "react-hook-form";

export type AddAppointmentType =
  AppointmentRouteTypes["/appointments/:medicalHistoryId"]["POST"]["body"];

export type EditAppointmentType =
  AppointmentRouteTypes["/appointments/:id"]["PATCH"]["body"];
type FormProps = {
  defaultValues?: EditAppointmentType;
  onSubmit: SubmitHandler<AddAppointmentType>;
};

const useAppointmentForm = ({ defaultValues, onSubmit }: FormProps) => {
  const formMethods = useForm<AddAppointmentType>({
    defaultValues: {
      ...defaultValues,
      date: (defaultValues?.date
        ? new Date(defaultValues.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0]) as unknown as Date,
    },
  });

  const handleSubmit = formMethods.handleSubmit(
    omitUnchangedFormFields(formMethods.formState.dirtyFields, onSubmit)
  );

  return {
    formMethods,
    handleSubmit,
  };
};

export default useAppointmentForm;
