import { PatientRouteTypes } from "@nizar-repo/patients-types";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { Link } from "react-router-dom";
import usePatientsList from "./usePatientsList";

const PatientsList = () => {
  usePageHeaderInit({
    title: "Patients",
    description:
      "Manage all patient records, view medical histories, and track appointments in one centralized location.",
    icon: <Icons.Users className="w-6 h-6" />,
    buttons: (
      <>
        <Link to="/patients/add">
          <Button variant="primary">
            <Icons.Plus className="w-4 h-4" />
            Add New Patient
          </Button>
        </Link>
      </>
    ),
  });

  const { data, isLoading, query, setQuery, deletePatient, isDeleteLoading } =
    usePatientsList();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <SEOHelmet
        description="Comprehensive patient management system for medical practices. View, edit, and manage patient records efficiently."
        title="Patient Management - Dashboard"
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
            <Icons.Users className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Patient Directory
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {data?.items?.length || 0} patients registered
            </p>
          </div>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="unified-card overflow-hidden">
        <ControlledDataTable<
          PatientRouteTypes["/patients/"]["GET"]["response"]["items"][number]
        >
          columns={[
            {
              title: "Patient Name",
              selector: "fullName",
              sortable: true,
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <Icons.User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {row.fullName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {row._id.toString().slice(-8)}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              title: "Contact Information",
              selector: "phoneNumber",
              sortable: true,
              cell: (row) => (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Icons.Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">
                      {row.phoneNumber}
                    </span>
                  </div>
                  {row.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {row.email}
                      </span>
                    </div>
                  )}
                </div>
              ),
            },
            {
              title: "Birth Date",
              selector: "birthDate",
              cell: (row) => {
                const date = new Date(row.birthDate);
                const age = Math.floor(
                  (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
                );
                return (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Icons.Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Age: {age} years
                    </div>
                  </div>
                );
              },
              sortable: true,
            },
            {
              title: "Actions",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <Link to={`${row._id}/medical-histories`}>
                    <Button
                      disabled={isDeleteLoading}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Icons.Heart className="w-3 h-3" />
                      Medical History
                    </Button>
                  </Link>
                  <Link to={`edit/${row._id}`}>
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
                    onClick={() => deletePatient(row._id.toString())}
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
          data={data}
          isLoading={isLoading}
          query={query}
          setQuery={setQuery}
        />
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Users className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {data?.items?.length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Patients
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Calendar className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {data?.items?.filter((p) => {
              const date = new Date(p.birthDate);
              const today = new Date();
              return date.getMonth() === today.getMonth();
            }).length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Birthdays This Month
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.CheckCircle className="w-6 h-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {data?.items?.filter((p) => p.email).length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            With Email Contacts
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
