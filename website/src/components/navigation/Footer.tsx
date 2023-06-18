import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-4 sm:px-10 pt-10 pb-6 bg-gradient-to-bl from-accent-200 via-accent-200 to-accent flex flex-col items-center justify-center z-30">
      <div className="flex w-full flex-col items-center justify-start max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-200">
          <div className="w-full flex flex-col gap-4">
            <strong className="text-white text-lg">Mūsu produkti</strong>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="https://apps.apple.com/lv/app/spotloc-events/id6445900535"
                  target="_blank"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  Spotloc IOS
                </Link>
              </li>

              <li>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.spotloc.app"
                  target="_blank"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  Spotloc Android
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-4">
            <strong className="text-white text-lg">Sadaļas</strong>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                >
                  Sākums
                </Link>
              </li>
              <li>
                <Link
                  href="/organizatoriem"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                >
                  Organizatoriem
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtu.be/zqTsatAVr54"
                  target="_blank"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  Treileris
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtu.be/nVOFd2ulwQ0"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                >
                  Intervija
                </Link>
              </li>
              <li>
                <Link
                  href="/pasakums/thinktank"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                >
                  ThinkTank 2023
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full flex flex-col gap-4">
            <strong className="text-white text-lg">Sociālie tīkli</strong>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/spotlocapp"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/instagram-spotloc.svg"
                    alt="Instagram logo"
                  />
                  <p>spotlocapp</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=100090028763526"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/facebook-spotloc.svg"
                    alt="Facebook logo"
                  />
                  <p>Spotloc</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.tiktok.com/@spotlocapp"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/tik-tok-spotloc.svg"
                    alt="Tik-Tok logo"
                  />
                  <p>spotlocapp</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://github.com/spotorg"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/github-spotloc.svg"
                    alt="Github logo"
                  />
                  <p>spotorg</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/93092111 "
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/linkedin-spotloc.svg"
                    alt="Linkedin logo"
                  />
                  <p>spotlocapp</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://twitter.com/spotloclv"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/twitter-spotloc.svg"
                    alt="Twitter logo"
                  />
                  <p>spotlocapp</p>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://youtube.com/@spotloc"
                  className="flex items-center gap-2 opacity-75 hover:opacity-100"
                  rel="noreferrer"
                >
                  <Image
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover"
                    src="/icons/youtube-spotloc.svg"
                    alt="Youtube logo"
                  />
                  <p>spotloc</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-4">
            <strong className="text-white text-lg">Kontakti</strong>
            <ul className="flex flex-col gap-2">
              <li className="opacity-75">SMU Spotloc</li>
              <li className="opacity-75">V23970002022</li>
              <li>
                <Link
                  href="mailto:info@quickstack.lv"
                  className="opacity-75 hover:opacity-100"
                >
                  info@quickstack.lv
                </Link>
              </li>
              <li>
                <Link
                  href="tel:+37126956611"
                  className="opacity-75 hover:opacity-100"
                >
                  +37126956611
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full border-t mt-6 py-4 sm:p-4 flex-col-reverse sm:flex-row items-center sm:items-start justify-between">
          <small className="text-gray-100 pointer-events-none mt-4 sm:mt-0">
            © spotloc {new Date().getFullYear()}
          </small>

          <ul className="flex gap-3 text-gray-100 text-sm">
            <li className="hover:underline">
              <Link href="/privatuma-politika" className="text-center">
                Privātuma politika
              </Link>
            </li>
            <li className="hover:underline">
              <Link href="/lietosanas-noteikumi" className="text-center">
                Lietošanas nosacījumi
              </Link>
            </li>
            <li className="hover:underline">
              <Link href="/sikfailu-politika" className="text-center">
                Sīkfailu politika
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
