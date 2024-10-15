import React from "react";
import { Button, ControlledDataTable } from "@nizar-repo/ui";
import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import useMarketingTargetsList from "./useMarketingTargetsList";
import SEOHelmet from "../../../components/SEO";
import usePageHeaderInit from "../../../contexts/PageHeaderContext/usePageHeaderInit";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
const MarketingTargetsList = () => {
  usePageHeaderInit({
    title: "Marketing Targets",
    description:
      "Marketing targets list page is destined to show all the marketing targets.",
    icon: <FaUsers />,
    buttons: (
      <>
        <Link to="/marketing-targets/add">
          <Button variant="success">Add One</Button>
        </Link>

        {/* <Link to="/">
          <Button variant="success">Add In Bulk</Button>
        </Link> */}
      </>
    ),
  });

  const {
    data,
    isLoading,
    query,
    setQuery,
    deleteMarketingTarget,
    isDeleteLoading,
  } = useMarketingTargetsList();

  return (
    <div className="w-4/5 mx-auto">
      <SEOHelmet
        description="Marketing targets list page is destined to show all the marketing targets."
        title="Marketing Targets"
      />
      <ControlledDataTable<
        MarketingTargetRouteTypes["/marketing-targets/"]["GET"]["response"]["items"][number]
      >
        columns={[
          {
            title: "Full Name",
            selector: "fullName",
            sortable: true,
          },
          {
            title: "Email",
            selector: "email",
            sortable: true,
          },
          {
            title: "Phone Number",
            selector: "phoneNumber",
            sortable: true,
          },
          {
            title: "Actions",
            cell: (row) => (
              <div className="flex justify-end">
                <Link to={`/marketing-targets/edit/${row._id}`}>
                  <Button disabled={isDeleteLoading} variant="warning">
                    Edit
                  </Button>
                </Link>
                <Button
                  disabled={isDeleteLoading}
                  variant="danger"
                  onClick={() => deleteMarketingTarget(row._id.toString())}
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

export default MarketingTargetsList;
