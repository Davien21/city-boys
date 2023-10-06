import { NextSeo } from "next-seo";

const HomePageHead = () => {
  return (
    <>
      <NextSeo
        title="Kompare currency converter | Home"
        description="Kompare is a powerful Chrome extension for converting currencies and tracking stock prices. Try it now!"
        openGraph={{
          title: "Kompare currency converter | Home",
          description:
            "Kompare is a powerful Chrome extension for converting currencies and tracking stock prices. Try it now!",
          images: [
            {
              url: "https://res.cloudinary.com/davien21/image/upload/v1680819583/kompare/kompare-opengraph_belz2r.png",
              width: 1200,
              height: 630,
              alt: "Kompare Chrome extension",
            },
          ],
        }}
      />
    </>
  );
};

export { HomePageHead };
