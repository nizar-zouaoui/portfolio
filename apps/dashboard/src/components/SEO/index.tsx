import React from "react";
import { Helmet } from "react-helmet-async";
import { ISEO } from "./interface";

const SEOHelmet: React.FC<ISEO> = ({ description, title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEOHelmet;
