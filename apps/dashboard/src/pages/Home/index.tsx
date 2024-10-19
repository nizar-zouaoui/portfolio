import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";
import { FaHome } from "react-icons/fa";

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
    </>
  );
};

export default Home;
