import { PatientRouteTypes } from "@nizar-repo/patients-types";
import { omitUnchangedFormFields } from "helpers/omitUnchangedFormFields";
import { SubmitHandler, useForm } from "react-hook-form";

export type AddPatientType = Omit<
  PatientRouteTypes["/patients/"]["POST"]["body"],
  "birthDate"
> & {
  birthDate: string;
};

export type EditPatientType = Omit<
  PatientRouteTypes["/patients/:id"]["PATCH"]["body"],
  "birthDate"
> & {
  birthDate: string;
};
type FormProps = {
  defaultValues?: EditPatientType;
  onSubmit: SubmitHandler<AddPatientType>;
};

const usePatientForm = ({ defaultValues, onSubmit }: FormProps) => {
  const formMethods = useForm<AddPatientType>({
    defaultValues: {
      ...defaultValues,
      birthDate: defaultValues?.birthDate
        ? new Date(defaultValues.birthDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
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

export default usePatientForm;
