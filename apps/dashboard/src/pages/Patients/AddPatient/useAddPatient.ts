import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Api from "sdks";
import { AddPatientType } from "../Forms/PatientForm/usePatientForm";

const useAddPatient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addPatient, isLoading } = useMutation(
    async (data: AddPatientType) => {
      await Api.patientsSDK.addPatientData({
        body: { ...data, birthDate: new Date(data.birthDate) },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully added the patient",
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
    onSubmit: (data: AddPatientType) => addPatient(data),
    isLoading,
  };
};

export default useAddPatient;
