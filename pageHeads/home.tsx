import { NextSeo } from "next-seo";

const HomePageHead = () => {
  return (
    <>
      <NextSeo
        title="City Boys | Home"
        description="Cityboys is a Digital Web3 Open World being made possible with Generative AI & Virtual game engines."
        openGraph={{
          title: "City Boys | Home",
          description:
            "Cityboys is a Digital Web3 Open World being made possible with Generative AI & Virtual game engines.",
          images: [
            {
              url: "https://res.cloudinary.com/davien21/image/upload/v1680819583/city Boys/city Boys-opengraph_belz2r.png",
              width: 1200,
              height: 630,
              alt: "City Boys",
            },
          ],
        }}
      />
    </>
  );
};

export { HomePageHead };
