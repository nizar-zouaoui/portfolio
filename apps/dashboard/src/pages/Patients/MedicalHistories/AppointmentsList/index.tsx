import { MedicalHistoryRouteTypes } from "@nizar-repo/medical-histories-types";
import { PAYMENT_STATUS } from "@nizar-repo/medical-histories-types/enums";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { format } from "date-fns";
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
      "Patient appointment history and medical procedure tracking system.",
    icon: <Icons.Calendar className="w-6 h-6" />,
    buttons: (
      <>
        <Link
          to={`patients/${patient._id}/medical-histories/${patient.medicalHistoryId}/appointments/add`}
        >
          <Button variant="primary">
            <Icons.Plus className="w-4 h-4" />
            Add Appointment
          </Button>
        </Link>
      </>
    ),
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <SEOHelmet
        description="Patient appointment history and medical procedure tracking system."
        title="Appointments - Dashboard"
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center">
            <Icons.Calendar className="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Patient Appointments
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {medicalHistory?.items?.length || 0} appointments for this patient
            </p>
          </div>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="unified-card overflow-hidden">
        <ControlledDataTable<
          MedicalHistoryRouteTypes["/medical-histories/:id"]["GET"]["response"]["items"][number]
        >
          columns={[
            {
              title: "Appointment Date",
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                    <Icons.Calendar className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {format(new Date(row.date), "MMMM dd, yyyy")}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(row.date), "EEEE")}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Medical Acts",
              cell: (row) => (
                <div className="flex flex-col gap-2">
                  {row.acts.map((act) => (
                    <div
                      key={act._id.toString()}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-lg text-sm"
                    >
                      <Icons.Heart className="w-3 h-3" />
                      <span className="font-medium">{act.name}</span>
                      {act.teeth && (
                        <span className="text-xs bg-primary-200 dark:bg-primary-800 px-2 py-1 rounded">
                          Tooth {act.teeth}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: "Payment Status",
              cell: (row) => {
                const statusConfig = {
                  [PAYMENT_STATUS.PAID]: {
                    icon: Icons.CheckCircle,
                    label: "Paid",
                    bgColor: "bg-success-100 dark:bg-success-900",
                    textColor: "text-success-800 dark:text-success-200",
                    iconColor: "text-success-600",
                  },
                  [PAYMENT_STATUS.PENDING]: {
                    icon: Icons.Clock,
                    label: "Pending",
                    bgColor: "bg-warning-100 dark:bg-warning-900",
                    textColor: "text-warning-800 dark:text-warning-200",
                    iconColor: "text-warning-600",
                  },
                  [PAYMENT_STATUS.FREE]: {
                    icon: Icons.InformationCircle,
                    label: "Free",
                    bgColor: "bg-info-100 dark:bg-info-900",
                    textColor: "text-info-800 dark:text-info-200",
                    iconColor: "text-info-600",
                  },
                };

                const config = statusConfig[row.paymentStatus] || {
                  icon: Icons.ExclamationTriangle,
                  label: "Unknown",
                  bgColor: "bg-gray-100 dark:bg-gray-800",
                  textColor: "text-gray-800 dark:text-gray-200",
                  iconColor: "text-gray-600",
                };

                const IconComponent = config.icon;

                return (
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor} ${config.textColor}`}
                  >
                    <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
                    <span className="font-medium">{config.label}</span>
                  </div>
                );
              },
            },
            {
              title: "Actions",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/patients/${patient._id}/medical-histories/${patient.medicalHistoryId}/appointments/edit/${row._id}`}
                  >
                    <Button
                      disabled={isDeleteLoading}
                      variant="secondary"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Icons.Edit className="w-3 h-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    disabled={isDeleteLoading}
                    variant="error"
                    size="sm"
                    onClick={() => deleteAppointment(row._id.toString())}
                    className="flex items-center gap-1"
                  >
                    {isDeleteLoading ? (
                      <Icons.LoadingSpinner className="w-3 h-3" />
                    ) : (
                      <Icons.Delete className="w-3 h-3" />
                    )}
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

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Calendar className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {medicalHistory?.items?.length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Appointments
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.CheckCircle className="w-6 h-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {medicalHistory?.items?.filter(
              (a) => a.paymentStatus === PAYMENT_STATUS.PAID
            ).length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Paid</div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Clock className="w-6 h-6 text-warning-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {medicalHistory?.items?.filter(
              (a) => a.paymentStatus === PAYMENT_STATUS.PENDING
            ).length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Pending Payment
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Heart className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {medicalHistory?.items?.reduce(
              (total, appointment) => total + appointment.acts.length,
              0
            ) || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Procedures
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
