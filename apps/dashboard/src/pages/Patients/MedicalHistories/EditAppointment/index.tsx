import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import AppointmentForm from "pages/Patients/Forms/AppointmentForm";
import { FaNotesMedical } from "react-icons/fa";
import useEditAppointment from "./useEditAppointment";

const EditAppointment = () => {
  const { defaultValues, onSubmit, isLoading, acts } = useEditAppointment();
  usePageHeaderInit({
    title: "Edit Appointment",
    description: "Edit Appointment page is destined to edit a appointment.",
    icon: <FaNotesMedical />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto my-8">
      <AppointmentForm
        defaultValues={defaultValues}
        loading={isLoading}
        onSubmit={onSubmit}
        acts={acts}
      />
    </div>
  );
};

export default EditAppointment;
