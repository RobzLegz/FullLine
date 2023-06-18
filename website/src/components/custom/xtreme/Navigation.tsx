import Link from "next/link";
import Navigation from "../../navigation/Navigation";

const XtremeMarathonNavigation = () => {
  return (
    <Navigation
      className="text-primary-100 sm:backdrop-blur-lg bg-transparent-400"
      logoSrc="/icons/spotloc-logo-white.png"
      between
      burgerClassName="bg-primary-100"
    >
      <li className="text-primary-300">
        <Link href="/">Sākums</Link>
      </li>
      <li className="text-primary-300">
        <Link href="/maratons">Maratons</Link>
      </li>
      <li>
        <Link
          href="/maratons/register"
          className="bg-accent border border-white flex items-center justify-center px-4 py-1 rounded-md  text-white"
        >
          Reģistrēties
        </Link>
      </li>
    </Navigation>
  );
};

export default XtremeMarathonNavigation;
