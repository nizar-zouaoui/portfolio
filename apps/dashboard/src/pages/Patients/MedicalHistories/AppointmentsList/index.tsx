import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { format } from "date-fns";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAppointmentsList from "./useAppointmentsList";

const AppointmentsList = () => {
  const {
    medicalHistory,
    query,
    setQuery,
    patient,
    deleteAppointment,
    isDeleteLoading,
  } = useAppointmentsList();

  usePageHeaderInit({
    title: "Appointments",
    description:
      "appointments list page is destined to show all the appointments.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Link
          to={`patients/${patient._id}/medical-histories/${patient.medicalHistoryId}/appointments/add`}
        >
          <Button variant="success">Add One</Button>
        </Link>
      </>
    ),
  });

  return (
    <div className="w-4/5 mx-auto">
      <SEOHelmet
        description="appointments list page is destined to show all the appointments."
        title="Appointments"
      />
      <ControlledDataTable<
        MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"]["items"][number]
      >
        columns={[
          {
            title: "Date",
            selector: "date",
            cell: (row) => <>{format(new Date(row.date), "dd-MM-yyyy")}</>,
            sortable: true,
          },
          {
            title: "Acts",
            cell: (row) => (
              <div className="flex flex-col gap-2">
                {row.acts.map((act) => (
                  <span
                    key={act._id.toString()}
                    className="p-1 dark:text-slate-400 text-slate-500 dark:bg-slate-800 bg-slate-100 rounded-md"
                  >
                    {act.name}
                  </span>
                ))}
              </div>
            ),
          },
          {
            title: "Payment Status",
            selector: "paymentStatus",
            cell: (row) => {
              switch (row.paymentStatus) {
                case PAYMENT_STATUS.PAID:
                  return (
                    <span className="p-1 dark:text-green-800 text-green-500 dark:bg-green-600 bg-green-100 rounded-md">
                      Paid
                    </span>
                  );
                case PAYMENT_STATUS.PENDING:
                  return (
                    <span className="p-1 dark:text-yellow-400 text-yellow-500 dark:bg-yellow-800 bg-yellow-100 rounded-md">
                      Pending
                    </span>
                  );
                case PAYMENT_STATUS.FREE:
                  return (
                    <span className="p-1 dark:text-slate-400 text-slate-500 dark:bg-slate-800 bg-slate-100 rounded-md">
                      Free
                    </span>
                  );
                default:
                  return (
                    <span className="p-1 dark:text-slate-400 dark:bg-slate-800 text-gray-500 bg-gray-100 rounded-md">
                      Unknown
                    </span>
                  );
              }
            },
            sortable: true,
          },
          {
            title: "Actions",
            cell: (row) => (
              <div className="flex justify-end">
                <Link
                  to={`/patients/${patient._id}/medical-histories/${patient.medicalHistoryId}/appointments/edit/${row._id}`}
                >
                  <Button disabled={isDeleteLoading} variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  disabled={isDeleteLoading}
                  variant="error"
                  onClick={() => deleteAppointment(row._id.toString())}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        keyExtractor={(item) => item._id.toString()}
        showSearch
        data={medicalHistory}
        isLoading={false}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default AppointmentsList;
