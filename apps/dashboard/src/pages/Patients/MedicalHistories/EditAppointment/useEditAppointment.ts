import {
  AppointmentRouteTypes,
  LeanActDocument,
} from "@nizar-repo/medical-histories-types";
import { PaginatedResult } from "@nizar-repo/shared-types/PaginationTypes";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import generateApiMessage from "helpers/generateApiMessage";
import { EditAppointmentType } from "pages/Patients/Forms/AppointmentForm/useAppointmentForm";
import { useMutation, useQueryClient } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Api from "sdks";

const useEditAppointment = () => {
  const { appointment, acts } = useLoaderData() as {
    appointment: AppointmentRouteTypes["/appointments/:id"]["GET"]["response"];
    acts: PaginatedResult<LeanActDocument>;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToastContext();
  const { mutate: addAppointment, isLoading } = useMutation(
    async (data: EditAppointmentType) => {
      await Api.medicalHistoriesSDK.updateAppointmentData({
        params: { id: appointment._id.toString() },
        body: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("appointments");
        navigate(-1);
        toast({
          type: "success",
          message: "Successfully updated the appointment",
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
    defaultValues: appointment,
    onSubmit: (data: EditAppointmentType) => addAppointment(data),
    isLoading,
    acts,
  };
};

export default useEditAppointment;
