import Icons from "@nizar-repo/ui/src/components/Icons";
import Link from "next/link";

const HomeIcon = () => {
  return (
    <div className="flex items-center text-gray-800 dark:text-gray-100 space-x-2">
      <Icons.Home className="text-2xl" />
      <Link
        href="/"
        className="text-xl font-bold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        Home
      </Link>
    </div>
  );
};

export default HomeIcon;
