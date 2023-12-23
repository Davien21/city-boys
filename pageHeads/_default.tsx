import { DefaultSeo } from "next-seo";

function DefaultSEOHead() {
  return (
    <>
      <DefaultSeo
        title="City Boys | Home"
        description="Cityboys is a Digital Web3 Open World being made possible with Generative AI & Virtual game engines."
        openGraph={{
          type: "website",
          locale: "en_gb",
          url: "https://city-boys.com",
          site_name: "City Boys",
          title: "City Boys | Home",
          description:
            "Cityboys is a Digital Web3 Open World being made possible with Generative AI & Virtual game engines.",
          images: [
            {
              url: "https://res.cloudinary.com/davien21/image/upload/v1680819583/city Boys/city Boys-opengraph_belz2r.png",
              width: 1200,
              height: 630,
              alt: "City Boys Token",
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1702905867/city-boys/favicon_rlijke.ico",
            type: "image/x-icon",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1702905868/city-boys/apple-touch-icon-iphone-60x60_kc0ooo.png",
            sizes: "60x60",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1702905867/city-boys/apple-touch-icon-ipad-76x76_iuqyvo.png",
            sizes: "76x76",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1702905868/city-boys/apple-touch-icon-iphone-retina-120x120_bfdvfr.png",
            sizes: "120x120",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1702905868/city-boys/apple-touch-icon-ipad-retina-152x152_ykas41.png",
            sizes: "152x152",
          },
          // {
          //   rel: "manifest",
          //   href: "/manifest.json",
          // },
        ]}
        additionalMetaTags={[
          // {
          //   name: "google-site-verification",
          //   content: "phFfK9UcYyyYuCIeZqgoV_WzfMu9ZgPHnC0V51--fEA",
          // },
          {
            name: "keywords",
            content:
              "$CTB, City Boys, Token Launch",
          },
          {
            name: "theme-color",
            content: "#FFFFFF",
          },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
        ]}
      />
    </>
  );
}

{
  /* <script type='application/ld+json'> 
{
  "@context": "http://www.schema.org",
  "@type": "WebSite",
  "name": "Blockchain Hub Africa",
  "alternateName": "Blockchain Hub Africa",
  "url": "blockchainhub.africa"
}
 </script> */
}

export { DefaultSEOHead };
