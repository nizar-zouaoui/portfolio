import { AppointmentRouteTypes } from "@nizar-repo/medical-histories-types";
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
    defaultValues,
  });

  const handleSubmit = formMethods.handleSubmit(onSubmit);

  return {
    formMethods,
    handleSubmit,
  };
};

export default useAppointmentForm;
