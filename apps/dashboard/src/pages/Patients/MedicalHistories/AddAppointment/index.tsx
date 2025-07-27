import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import AppointmentForm from "pages/Patients/Forms/AppointmentForm";
import { FaNotesMedical } from "react-icons/fa";
import useAddAppointment from "./useAddAppointment";

const AddAppointment = () => {
  const { onSubmit, isLoading, acts } = useAddAppointment();
  usePageHeaderInit({
    title: "Create New Appointment",
    description:
      "Create New Appointment page is destined to create a new appointment.",
    icon: <FaNotesMedical />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto my-8">
      <AppointmentForm acts={acts} loading={isLoading} onSubmit={onSubmit} />
    </div>
  );
};

export default AddAppointment;
