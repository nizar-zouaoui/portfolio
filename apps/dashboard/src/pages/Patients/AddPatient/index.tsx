import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import PatientForm from "../Forms/PatientForm";
import useAddPatient from "./useAddPatient";

const AddPatient = () => {
  const { onSubmit, isLoading } = useAddPatient();
  usePageHeaderInit({
    title: "Create New Patient",
    description: "Create New Patient page is destined to create a new patient.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto my-8">
      <PatientForm loading={isLoading} onSubmit={onSubmit} />
    </div>
  );
};

export default AddPatient;
