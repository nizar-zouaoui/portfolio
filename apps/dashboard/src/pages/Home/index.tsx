import usePageHeaderInit from "../../contexts/PageHeaderContext/usePageHeaderInit";
import SEOHelmet from "../../components/SEO";
import React from "react";
import { FaHome } from "react-icons/fa";
import { Button } from "@nizar-repo/ui";

const Home = () => {
  usePageHeaderInit({
    title: "Simple Deliver",
    description:
      "Simple Deliver is marketing app that helps ease the of whatsapp and email services",
    icon: <FaHome />,
  });
  return (
    <>
      <SEOHelmet
        title="Simple Deliver"
        description="Simple Deliver is marketing app that helps ease the of whatsapp and email services"
      />
      <h1 className="text-center">Welcome to Simple Deliver</h1>
      <div className="flex space-x-2">
        <Button variant="primary">primary</Button>
        <Button variant="error">error</Button>
        <Button variant="warning">warning</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">success</Button>
        <Button variant="disabled">disabled</Button>
      </div>
    </>
  );
};

export default Home;
