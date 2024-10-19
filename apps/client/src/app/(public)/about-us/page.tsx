import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Us page is destined to walk you through what, how and why this app is designed.",
};
const AboutUsPage = () => {
  return (
    <main className="mt-20">
      <h1 className="text-center">Welcome to Simple Deliver's About Us page</h1>
    </main>
  );
};

export default AboutUsPage;
