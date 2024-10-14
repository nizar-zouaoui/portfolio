import React from "react";
import { ControlledDataTable } from "@nizar-repo/ui";
import { MarketingTargetRouteTypes } from "@nizar-repo/marketing-targets-types";
import useMarketingTargetsList from "./useMarketingTargetsList";
const MarketingTargetsList = () => {
  const { data, isLoading, query, setQuery } = useMarketingTargetsList();

  return (
    <div className="w-4/5 mx-auto">
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
