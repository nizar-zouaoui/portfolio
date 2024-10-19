import { DarkMode } from "@nizar-repo/ui";
import NavBarLinks, { LinkProp } from "../NavBarLinks";
import HomeIcon from "./HomeIcon";
import UserIcon from "./UserIcon";
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
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-16 min-h-16 h-16 flex justify-between items-center">
      <HomeIcon />
      <div className="flex items-center space-x-6">
        <NavBarLinks links={LINKS} />
        <UserIcon />
        <DarkMode />
      </div>
    </nav>
  );
}
