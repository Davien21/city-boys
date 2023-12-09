import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ConnectButton } from "./ConnectButton";

function Menu() {
  const activeRoute = useRouter().asPath;

  const activeRouteClass = (route: string) => {
    if (activeRoute.includes(route)) return `px-3 text-base text-white `;

    return `px-3 text-base text-white`;
  };

  return (
    <nav className="mt-16">
      <ul className="items-center lg:hidden font-bo">
        <li className={activeRouteClass("")}>
          <Link href="">About Out City</Link>
        </li>
        <li className={activeRouteClass("/work")}>
          <Link href="">City Council</Link>
        </li>
        <li className={activeRouteClass("/events")}>
          <Link href="/events">Citynomics</Link>
        </li>
        <li className={activeRouteClass("/blog")}>
          <Link href="/blog">Citymap</Link>
        </li>
        <li className={activeRouteClass("/contact")}>
          <Link href="/contact">Word on the street</Link>
        </li>
        <li>
          <a>
            <ConnectButton />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export { Menu };
