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
    <nav className="unified-navbar sticky top-0 z-50 px-4 sm:px-8 lg:px-16 min-h-16 h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* Logo/Home */}
        <div className="flex-shrink-0">
          <HomeIcon />
        </div>

        {/* Navigation Links & Controls */}
        <div className="flex items-center space-x-8">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavBarLinks links={LINKS} />
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <UserIcon />
            <DarkMode />
          </div>
        </div>
      </div>
    </nav>
  );
}
