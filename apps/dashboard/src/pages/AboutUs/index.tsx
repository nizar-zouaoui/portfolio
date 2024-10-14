import usePageHeaderInit from "../../contexts/PageHeaderContext/usePageHeaderInit";
import SEOHelmet from "../../components/SEO";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

const AboutUs = () => {
  usePageHeaderInit({
    title: "About Us",
    description:
      "About Us page is destined to walk you through what, how and why this app is designed.",
    icon: <FaQuestionCircle />,
  });
  return (
    <>
      <SEOHelmet
        title="About Us"
        description="About Us page is destined to walk you through what, how and why this app is designed."
      />
      <h1 className="text-center">Welcome to Simple Deliver's About Us page</h1>
    </>
  );
};

export default AboutUs;
