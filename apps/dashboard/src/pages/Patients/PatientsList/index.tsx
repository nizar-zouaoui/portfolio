import { PatientRouteTypes } from "@nizar-repo/patients-types";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import usePatientsList from "./usePatientsList";
const PatientsList = () => {
  usePageHeaderInit({
    title: "Patients",
    description: "patients list page is destined to show all the patients.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Link to="/patients/add">
          <Button variant="success">Add One</Button>
        </Link>

        {/* <Link to="/">
          <Button variant="success">Add In Bulk</Button>
        </Link> */}
      </>
    ),
  });

  const { data, isLoading, query, setQuery, deletePatient, isDeleteLoading } =
    usePatientsList();

  return (
    <div className="w-4/5 mx-auto">
      <SEOHelmet
        description="patients list page is destined to show all the patients."
        title="Patients"
      />
      <ControlledDataTable<
        PatientRouteTypes["/patients/"]["GET"]["response"]["items"][number]
      >
        columns={[
          {
            title: "Full Name",
            selector: "fullName",
            sortable: true,
          },
          {
            title: "Phone Number",
            selector: "phoneNumber",
            sortable: true,
          },
          {
            title: "Birth Date",
            selector: "birthDate",
            cell: (row) => {
              const date = new Date(row.birthDate);
              return date.toLocaleDateString("fr-TN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
            },
            sortable: true,
          },
          {
            title: "Email",
            selector: "email",
            cell: (row) => row.email || "N/A",
            sortable: true,
          },
          {
            title: "Actions",
            cell: (row) => (
              <div className="flex justify-end">
                <Link to={`/patients/${row._id}/medical-histories`}>
                  <Button disabled={isDeleteLoading} variant="primary">
                    Medical History
                  </Button>
                </Link>
                <Link to={`/patients/edit/${row._id}`}>
                  <Button disabled={isDeleteLoading} variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  disabled={isDeleteLoading}
                  variant="error"
                  onClick={() => deletePatient(row._id.toString())}
                >
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
  );
};

export default PatientsList;
