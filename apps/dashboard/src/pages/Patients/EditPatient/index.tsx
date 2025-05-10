import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import PatientForm from "../Forms/PatientForm";
import useEditPatient from "./useEditPatient";

const EditPatient = () => {
  const { defaultValues, onSubmit, isLoading } = useEditPatient();
  usePageHeaderInit({
    title: "Edit Patient",
    description: "Edit Patient page is destined to edit a patient.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto my-8">
      <PatientForm
        defaultValues={defaultValues}
        loading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditPatient;
