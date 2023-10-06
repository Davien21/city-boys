import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { DefaultSEOHead, HomePageHead, NotFoundPageHead } from "./index";
type headsType = { [key: string]: JSX.Element | string };

const PageHeadSetup = () => {
  const heads: headsType = {
    "/": <HomePageHead />,
    "/components": <HomePageHead />,
    "/_error": <NotFoundPageHead />,
  };
  let route = useRouter().pathname;
  let A = `${heads[route]}`;
  return (
    <>
      {heads[route] || heads["/"]}
      <DefaultSEOHead />
    </>
  );
};

export default PageHeadSetup;
