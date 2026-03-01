import Icons from "@nizar-repo/ui/src/components/Icons";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";

const Home = () => {
  usePageHeaderInit({
    title: "Simple Deliver",
    description:
      "Simple Deliver is marketing app that helps ease the of whatsapp and email services",
    icon: <Icons.Home />,
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
