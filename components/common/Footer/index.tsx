import {
  CopyrightIcon,
  DiscordIcon,
  TelegramIcon,
  TwitterIcon,
  logo,
} from "assets/images";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";

import styles from "./footer.module.scss";
import { IComponentState } from "interfaces";
import Image from "next/image";

function Footer() {
  return (
    <footer className={`${styles["container"]} container-fluid py-20 px-4`}>
      <div className="xl:grid xl:grid-cols-12 gap-y-10 gap-x-20 justify-items-center xl:justify-start xl:justify-items-end flex-props">
        <div className="order-3 sm:order-1 xl:col-span-4 gap-y-5 flex-props">
          <div className="flex">
            <Image src={logo} alt="Logo" width={100} height={60} className="" />
          </div>
          <hr />
          <div className="flex items-center gap-x-2">
            <CopyrightIcon />
            <span className="text-[#C7C6CA]">
              2023 City-Boys | All Rights Reserved
            </span>
          </div>
        </div>
        <ul className="xl:col-span-3 order-2 sm:order-2 uppercase flex-props gap-x-8">
          <li>
            <a
              className="hover:text-red-4"
              href="https://docs.city-boys.com/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms & Conditions
            </a>
          </li>
        </ul>
        <div className="xl:col-span-5 order-1 sm:order-3 flex-props gap-y-5 gap-x-10">
          <span className="text-center sm:text-left">
            Have an issue? Contact{" "}
            <a className="hover:text-red-4" href="mailto:mayor@city-boys.com">
              mayor@city-boys.com
            </a>
          </span>
          <div className="flex gap-x-4">
            <div className={`${styles["sm-icons"]}`}>
              <a
                href="https://twitter.com/cityboystoken"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
            </div>
            <div className={`${styles["sm-icons"]}`}>
              <a
                href="https://t.me/cityboystoken"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
              </a>
            </div>
            <div className={`${styles["sm-icons"]}`}>
              <a
                href="https://discord.com/invite/ZmpCJkDSQj"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
