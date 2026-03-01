import useToastContext from "@nizar-repo/toast/Context/useToastContext";
import Toasts from "@nizar-repo/toast/Toasts";
import { DarkMode } from "@nizar-repo/ui";
import HomeIcon from "./HomeIcon";
import Links, { LinkProp } from "./Links";
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
  const { toasts } = useToastContext();
  return (
    <>
      <Toasts toasts={toasts} />
      <nav className="unified-navbar sticky top-0 z-50 px-4 sm:px-8 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo/Home */}
          <div className="flex-shrink-0">
            <HomeIcon />
          </div>

          {/* Navigation Links & Controls */}
          <div className="flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Links links={LINKS} />
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <UserIcon />
              <DarkMode />
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <Links links={LINKS} />
        </div>
      </nav>
    </>
  );
}
