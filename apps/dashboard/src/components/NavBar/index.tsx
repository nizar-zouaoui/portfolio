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
    <nav className="bg-gray-800 mb-20 text-white px-16 py-4 flex justify-between items-center">
      <HomeIcon />
      <div className="flex items-center space-x-6">
        <Links links={LINKS} />
        <UserIcon />
      </div>
    </nav>
  );
}
