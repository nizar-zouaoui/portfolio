import { ActRouteTypes } from "@nizar-repo/medical-histories-types";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import Icons from "@nizar-repo/ui/src/components/Icons";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { Link } from "react-router-dom";
import useActsList from "./useActList";
const ActsList = () => {
  usePageHeaderInit({
    title: "Acts",
    description:
      "Medical acts and procedures management for patient care billing.",
    icon: <Icons.Heart className="w-6 h-6" />,
    buttons: (
      <>
        <Link to="/acts/add">
          <Button variant="primary">
            <Icons.Plus className="w-4 h-4" />
            Add New Act
          </Button>
        </Link>
      </>
    ),
  });

  const { data, isLoading, query, setQuery, deleteAct, isDeleteLoading } =
    useActsList();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <SEOHelmet
        description="Medical acts and procedures management for patient care billing."
        title="Medical Acts - Dashboard"
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center">
            <Icons.Heart className="w-6 h-6 text-secondary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Medical Acts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {data?.items?.length || 0} medical acts in your catalog
            </p>
          </div>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="unified-card overflow-hidden">
        <ControlledDataTable<
          ActRouteTypes["/acts/"]["GET"]["response"]["items"][number]
        >
          columns={[
            {
              title: "Act Information",
              cell: (row) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                    <Icons.Heart className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {row.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Act ID: {row._id.toString().slice(-8)}
                    </div>
                  </div>
                </div>
              ),
              selector: "name",
              sortable: true,
            },
            {
              title: "Description",
              cell: (row) => (
                <div className="max-w-md">
                  <p className="text-gray-900 dark:text-white">
                    {row.description.length <= 100
                      ? row.description
                      : `${row.description.slice(0, 100)}...`}
                  </p>
                  {row.description.length > 100 && (
                    <button className="text-primary-600 text-sm hover:text-primary-700 mt-1">
                      Read more
                    </button>
                  )}
                </div>
              ),
              selector: "description",
              sortable: true,
            },
            {
              title: "Price",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <Icons.Check className="w-4 h-4 text-success-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${row.price.toFixed(2)}
                  </span>
                </div>
              ),
              selector: "price",
              sortable: true,
            },
            {
              title: "Actions",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <Link to={`/acts/edit/${row._id}`}>
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
                    onClick={() => deleteAct(row._id.toString())}
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
          <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Heart className="w-6 h-6 text-secondary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {data?.items?.length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Acts
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.Check className="w-6 h-6 text-success-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            $
            {data?.items?.reduce((sum, act) => sum + act.price, 0).toFixed(2) ||
              "0.00"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Value
          </div>
        </div>

        <div className="unified-card p-6 text-center">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icons.ChevronUp className="w-6 h-6 text-primary-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            $
            {data?.items?.length
              ? (
                  data.items.reduce((sum, act) => sum + act.price, 0) /
                  data.items.length
                ).toFixed(2)
              : "0.00"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average Price
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActsList;
