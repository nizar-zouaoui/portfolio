import Link from "next/link";
import { FaHome } from "react-icons/fa";

const HomeIcon = () => {
  return (
    <div className="flex items-center text-white space-x-2">
      <FaHome className="text-2xl" />
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>
    </div>
  );
};

export default HomeIcon;
