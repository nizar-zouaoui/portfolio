import UserIcon from "./UserIcon";
import Links, { LinkProp } from "./Links";
import HomeIcon from "./HomeIcon";
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
    <nav className="bg-gray-800 text-white px-16 py-4 flex justify-between items-center">
      {/* Left side: Home Icon */}
      <HomeIcon />
      {/* Right side: Links and Login/User button */}
      <div className="flex items-center space-x-6">
        {/* Navigation links */}
        <Links links={LINKS} />
        {/* User Login/User Dropdown */}
        <UserIcon />
      </div>
    </nav>
  );
}
