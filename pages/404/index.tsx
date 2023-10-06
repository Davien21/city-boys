import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Header } from "components";

import styles from "./404.module.css";

function NotFoundPage() {
  return (
    <>
      {/* <Header /> */}
      <main className={`${styles["container"]} `}>Not found</main>
    </>
  );
}

export default NotFoundPage;
