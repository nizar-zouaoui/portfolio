import { FaUsers } from "react-icons/fa";
import { RouteObject } from "react-router-dom";
import Api from "sdks";
import AddPatient from "./AddPatient";
import EditPatient from "./EditPatient";
import medicalHistoryRoutes, { appointmentsLinks } from "./MedicalHistories";
import PatientsList from "./PatientsList";

const fetchPatient = async (id: string) =>
  Api.patientsSDK.getPatientDataById({
    params: { id },
  });

const routes: RouteObject[] = [
  {
    index: true,
    element: <PatientsList />,
  },
  {
    path: "add",
    element: <AddPatient />,
  },
  {
    path: "edit/:id",
    element: <EditPatient />,
    loader: async ({ params }) => {
      const { id } = params;
      if (!id) throw new Error("Id is required for this route");
      const patient = await fetchPatient(id);
      return {
        patient,
      };
    },
    errorElement: <div>Failed to load data</div>,
  },
  {
    path: ":id/medical-histories/",
    children: medicalHistoryRoutes,
  },
];
export default routes;

export const patientsLinks = [
  {
    main: true,
    pageName: "Patients",
    path: "/patients",
    icon: <FaUsers />,
  },
  {
    main: false,
    pageName: "Create New Patient",
    path: "/patients/add",
    icon: <FaUsers />,
  },

  {
    main: false,
    pageName: "Edit Patient",
    path: "/patients/edit/:id",
    icon: <FaUsers />,
  },
  ...appointmentsLinks,
] as const;
