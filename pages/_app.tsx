import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.scss";
import "tippy.js/dist/tippy.css";

import Head from "next/head";
import { getRandomKey } from "../utils/randomKey";

import { ToastContainer } from "react-toastify";
import PageHeadSetup from "pageHeads/pageHeadSetup";
import { ConnectWalletModal, LogoutWalletModal } from "components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link key={getRandomKey()} rel="icon" href="./favicon.ico" />
      </Head>
      <PageHeadSetup />
      <ToastContainer position="top-center" autoClose={5000} />
      <ConnectWalletModal />
      <LogoutWalletModal />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
