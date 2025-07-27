import { FaUsers } from "react-icons/fa";
import { RouteObject } from "react-router-dom";
import Api from "sdks";
import AddAppointment from "./AddAppointment";
import AppointmentsList from "./AppointmentsList";
import EditAppointment from "./EditAppointment";

const fetchPatient = async (id: string) =>
  Api.patientsSDK.getPatientDataById({
    params: { id },
  });

const routes: RouteObject[] = [
  {
    index: true,
    element: <AppointmentsList />,
    loader: async ({ params, request }) => {
      const { id } = params;
      if (!id) throw new Error("Id is required for this route");
      const url = new URL(request.url);
      const query = Object.fromEntries(url.searchParams.entries());
      const patient = await fetchPatient(id);
      const medicalHistory =
        await Api.medicalHistoriesSDK.getMedicalHistoryDataById({
          params: { id: patient.medicalHistoryId },
          query,
        });
      return {
        medicalHistory,
        patient,
      };
    },
  },
  {
    path: ":medicalHistoryId/appointments/add",
    element: <AddAppointment />,
    loader: async ({ params }) => {
      const { medicalHistoryId } = params;
      if (!medicalHistoryId) throw new Error("Id is required for this route");
      const acts = await Api.medicalHistoriesSDK.getActsPaginated({
        query: {},
      });
      return {
        acts,
      };
    },
  },
  {
    path: ":medicalHistoryId/appointments/edit/:appointmentId",
    element: <EditAppointment />,
    loader: async ({ params }) => {
      const { medicalHistoryId, appointmentId } = params;
      if (!medicalHistoryId || !appointmentId)
        throw new Error("Id is required for this route");
      const appointment = await Api.medicalHistoriesSDK.getAppointmentDataById({
        params: {
          id: appointmentId,
        },
      });
      const acts = await Api.medicalHistoriesSDK.getActsPaginated({
        query: {},
      });
      return {
        acts,
        appointment,
      };
    },
  },
];
export default routes;

export const appointmentsLinks = [
  {
    main: false,
    pageName: "Appointments",
    path: "/patients/:id/medical-histories",
    icon: <FaUsers />,
  },
  {
    main: false,
    pageName: "Create New Appointment",
    path: "/patients/:id/medical-histories/add",
    icon: <FaUsers />,
  },

  {
    main: false,
    pageName: "Edit Appointment",
    path: "/patients/:id/medical-histories/edit/:appointmentId",
    icon: <FaUsers />,
  },
] as const;
