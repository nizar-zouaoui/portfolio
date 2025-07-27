import { LeanActDocument } from "@nizar-repo/medical-histories-types";
import { PaginatedResult } from "@nizar-repo/shared-types/PaginationTypes";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { AddAppointmentType } from "pages/Patients/Forms/AppointmentForm/useAppointmentForm";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Api from "sdks";

const useAddAppointment = () => {
  const queryClient = useQueryClient();
  const { medicalHistoryId } = useParams<"medicalHistoryId">();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addAppointment, isLoading } = useMutation(
    async (data: AddAppointmentType) => {
      const body = {
        ...data,
        date: new Date(data.date),
      };
      await Api.medicalHistoriesSDK.addAppointmentData({
        body,
        params: {
          medicalHistoryId: medicalHistoryId!,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointments");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully added the appointment",
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

  const { acts } = useLoaderData() as {
    acts: PaginatedResult<LeanActDocument>;
  };
  return {
    onSubmit: (data: AddAppointmentType) => addAppointment(data),
    isLoading,
    acts,
  };
};

export default useAddAppointment;
