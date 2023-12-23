import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ConnectButton } from "./ConnectButton";

function Menu() {
  const activeRoute = useRouter().asPath;

  const activeRouteClass = (route: string) => {
    let className = `px-3 text-base text-white uppercase `;
    if (activeRoute.includes(route)) className += ``;

    return className;
  };

  const presale_start_Time = new Date("2023-12-21T15:00:00Z").getTime();

  const PRESALE_STARTED = new Date().getTime() > presale_start_Time;

  return (
    <nav className="mt-16">
      <ul className="items-center lg:hidden font-bo">
        <li className={activeRouteClass("#about")}>
          <Link href="#about">About Out City</Link>
        </li>
        <li className={activeRouteClass("#city-council")}>
          <Link href="#city-council">City Council</Link>
        </li>
        <li className={activeRouteClass("#citynomics")}>
          <Link href="#citynomics">Citynomics</Link>
        </li>
        <li className={activeRouteClass("/blog")}>
          <Link href="https://docs.city-boys.com/team">
            <a target="_blank" rel="noopener noreferrer">
              TEAM
            </a>
          </Link>
        </li>
        <li className={activeRouteClass("#faq")}>
          <Link href="#faq">Word on the street</Link>
        </li>
        {PRESALE_STARTED && (
          <li>
            <ConnectButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export { Menu };
