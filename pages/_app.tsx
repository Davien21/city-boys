import { AppProps } from "next/app";

import "tailwindcss/tailwind.css";

import "../index.scss";
import "swiper/css";
import "swiper/css/autoplay";
import "tippy.js/dist/tippy.css";

import Head from "next/head";
import { getRandomKey } from "../utils/randomKey";
import PageHeadSetup from "../pageHeads/pageHeadSetup";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link key={getRandomKey()} rel="icon" href="./favicon.ico" />
      </Head>
      {/* <PageHeadSetup /> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
