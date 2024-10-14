import React from "react";
import { ISEO } from "./interface";
import { Helmet } from "react-helmet-async";

const SEOHelmet: React.FC<ISEO> = ({ description, title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEOHelmet;
