import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

import "../index.scss";
import "tippy.js/dist/tippy.css";

import Head from "next/head";
import { getRandomKey } from "../utils/randomKey";
import PageHeadSetup from "../pageHeads/pageHeadSetup";

import { configureChains, WagmiConfig, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ToastContainer } from "react-toastify";
import { hardhat, mainnet, polygonMumbai } from "@wagmi/chains";

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_ID || "";
const { chains, publicClient } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider(), alchemyProvider({ apiKey })]
);

const { connectors } = getDefaultWallets({
  appName: "CityBoys",
  chains,
  projectId: "4dc0e4388ead943cbd9e3cca315f56d8",
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link key={getRandomKey()} rel="icon" href="./favicon.ico" />
      </Head>
      {/* <PageHeadSetup /> */}
      <ToastContainer position="top-center" autoClose={5000} />
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
