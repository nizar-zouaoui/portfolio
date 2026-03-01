import Icons from "@nizar-repo/ui/src/components/Icons";
import SEOHelmet from "components/SEO";
import usePageHeaderInit from "contexts/PageHeaderContext/usePageHeaderInit";

const AboutUs = () => {
  usePageHeaderInit({
    title: "About Us",
    description:
      "About Us page is destined to walk you through what, how and why this app is designed.",
    icon: <Icons.InformationCircle />,
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
