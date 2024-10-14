import Links, { LinkProp } from "./Links";
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
    <nav className="bg-gray-800 border-b border-gray-700 text-white px-16 h-16 flex justify-between items-center">
      <HomeIcon />
      <div className="flex items-center space-x-6">
        <Links links={LINKS} />
        <UserIcon />
      </div>
    </nav>
  );
}
