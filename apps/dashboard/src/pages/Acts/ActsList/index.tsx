import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useActsList from "./useActList";
const ActsList = () => {
  usePageHeaderInit({
    title: "Acts",
    description: "Acts list page is destined to show all the acts.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Link to="/acts/add">
          <Button variant="success">Add One</Button>
        </Link>
      </>
    ),
  });

  const { data, isLoading, query, setQuery, deleteAct, isDeleteLoading } =
    useActsList();

  return (
    <div className="w-4/5 mx-auto">
      <SEOHelmet
        description="Acts list page is destined to show all the acts."
        title="Acts"
      />
      <ControlledDataTable<
        ActRouteTypes["/acts/"]["GET"]["response"]["items"][number]
      >
        columns={[
          {
            title: "Name",
            selector: "name",
            sortable: true,
          },
          {
            title: "Description",
            cell: (row) => (
              <span>
                {row.description.length <= 24
                  ? row.description
                  : row.description.slice(0, 25)}
              </span>
            ),
          },
          {
            title: "Price",
            selector: "price",
            sortable: true,
          },
          {
            title: "Actions",
            cell: (row) => (
              <div className="flex justify-end">
                <Link to={`/acts/edit/${row._id}`}>
                  <Button disabled={isDeleteLoading} variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  disabled={isDeleteLoading}
                  variant="error"
                  onClick={() => deleteAct(row._id.toString())}
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

export default ActsList;
