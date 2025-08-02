import { CategoryRouteTypes } from "@nizar-repo/categories-types";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { sanitizeImageUrl } from "helpers/securityUtils";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCategoriesList from "./useCategoryList";

const CategoriesList = () => {
  usePageHeaderInit({
    title: "Categroies",
    description: "Categories list page is destined to show all the categories.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Link to="/categories/add">
          <Button variant="success">Add One</Button>
        </Link>

        {/* <Link to="/">
          <Button variant="success">Add In Bulk</Button>
        </Link> */}
      </>
    ),
  });

  const { data, isLoading, query, setQuery, deleteCategory, isDeleteLoading } =
    useCategoriesList();

  return (
    <div className="w-4/5 mx-auto">
      <SEOHelmet
        description="Categories list page is destined to show all the categories."
        title="Categories"
      />
      <ControlledDataTable<
        CategoryRouteTypes["/categories/"]["GET"]["response"]["items"][number]
      >
        columns={[
          {
            title: "Image",
            cell: (row) =>
              row.imgUrl ? (
                <img
                  src={sanitizeImageUrl(row.imgUrl)}
                  alt={row.title}
                  className="w-12 h-12 object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.svg";
                  }}
                />
              ) : (
                <span>No Image</span>
              ),
          },
          {
            title: "Title",
            selector: "title",
            sortable: true,
          },
          {
            title: "Desctiption",
            cell: (row) => (
              <span>
                {row.description.length <= 24
                  ? row.description
                  : row.description.slice(0, 25)}
              </span>
            ),
          },
          {
            title: "Actions",
            cell: (row) => (
              <div className="flex justify-end">
                <Link to={`/categories/edit/${row._id}`}>
                  <Button disabled={isDeleteLoading} variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  disabled={isDeleteLoading}
                  variant="error"
                  onClick={() => deleteCategory(row._id.toString())}
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

export default CategoriesList;
