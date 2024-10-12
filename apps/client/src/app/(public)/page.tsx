import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simple Deliver",
  description:
    "Simple Deliver is marketing app that helps ease the of whatsapp and email services",
};
export default function Page(): JSX.Element {
  return (
    <main className="mt-20">
      <h1 className="text-center">Welcome to Simple Deliver</h1>
    </main>
  );
}
