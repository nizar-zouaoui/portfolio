import { LeanPatientDocument } from "@nizar-repo/patients-types";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "sdks";
import { EditPatientType } from "../Forms/PatientForm/usePatientForm";

const useEditPatient = () => {
  const { patient } = useLoaderData() as {
    patient: LeanPatientDocument;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addPatient, isLoading } = useMutation(
    async (data: EditPatientType) => {
      let body = {};
      if (data.birthDate) {
        body = {
          ...data,
          birthDate: new Date(data.birthDate),
        };
      }
      body = data;
      await Api.patientsSDK.updatePatientData({
        params: { id: patient._id.toString() },
        body,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully updated the patient",
          timer: 2000,
        });
      },
      onError: (error) => {
        toast({
          type: "error",
          message: generateApiMessage(error),
          timer: 2000,
        });
      },
    }
  );

  return {
    defaultValues: {
      email: patient.email,
      fullName: patient.fullName,
      phoneNumber: patient.phoneNumber,
      birthDate: new Date(patient.birthDate).toISOString().split("T")[0],
      medicalHistoryId: patient.medicalHistoryId,
    },
    onSubmit: (data: EditPatientType) => addPatient(data),
    isLoading,
  };
};

export default useEditPatient;
