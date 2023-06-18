import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Header: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <header className="w-full border-b border-gray-300 py-2 mb-4 text-3xl font-semibold flex flex-col md:flex-row md:items-end justify-start gap-2 md:gap-6">
      <div className="flex items-end justify-start">{children}</div>

      <ul className="text-lg text-primary-800 flex flex-col md:flex-row gap-1 md:gap-4 md:items-end justify-start">
        <li className={router.asPath === "/profils" ? "text-accent" : ""}>
          <Link href="/profils">Profils</Link>
        </li>
        <li
          className={
            router.asPath.includes("profils/pasakums/izveidot")
              ? "text-accent"
              : ""
          }
        >
          <Link href="/profils/pasakums/izveidot">Pievienot pasākumu</Link>
        </li>
        <li
          className={
            router.asPath.includes("profils/vieta/izveidot")
              ? "text-accent"
              : ""
          }
        >
          <Link href="/profils/vieta/izveidot">Pievienot vietu</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
