import UserIcon from "./UserIcon";
import Links, { LinkProp } from "./Links";
import HomeIcon from "./HomeIcon";
import { DarkMode } from "@nizar-repo/ui";
import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import Toasts from "@nizar-repo/toast/Toasts";

const LINKS: LinkProp[] = [
  {
    pageName: "Home",
    path: "/",
  },
  {
    pageName: "About Us",
    path: "/about-us",
  },
];

export default function Navbar() {
  const { toasts } = useToastContext();
  return (
    <>
      <Toasts toasts={toasts} />
      <nav className="bg-gray-800  px-16 py-4 flex justify-between items-center">
        <HomeIcon />
        <div className="flex items-center space-x-6">
          <Links links={LINKS} />
          <UserIcon />
          <DarkMode />
        </div>
      </nav>
    </>
  );
}
