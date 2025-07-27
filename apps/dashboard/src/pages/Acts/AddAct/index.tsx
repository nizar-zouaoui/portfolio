import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaEdit } from "react-icons/fa";
import ActForm from "../Forms/ActForm";
import useAddAct from "./useAddAct";

const AddAct = () => {
  const { onSubmit, isLoading } = useAddAct();
  usePageHeaderInit({
    title: "Create New Act",
    description: "Create New Act page is destined to create a new act.",
    icon: <FaEdit />,
  });
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto mt-8">
      <ActForm loading={isLoading} onSubmit={onSubmit} />
    </div>
  );
};

export default AddAct;
