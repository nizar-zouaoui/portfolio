import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import ActForm from "../Forms/ActForm";
import useEditAct from "./useEditAct";

const EditAct = () => {
  const { defaultValues, onSubmit, isLoading } = useEditAct();
  usePageHeaderInit({
    title: "Edit Act",
    description: "Edit Act page is destined to edit a act.",
    icon: <FaUsers />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <ActForm
        defaultValues={defaultValues}
        loading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditAct;
