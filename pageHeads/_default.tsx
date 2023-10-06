import { DefaultSeo, NextSeo } from "next-seo";

function DefaultSEOHead() {
  return (
    <>
      <DefaultSeo
        title="Kompare | Home"
        description="Kompare is a powerful Chrome extension for converting currencies and tracking stock prices. Try it now!"
        openGraph={{
          type: "website",
          locale: "en_gb",
          url: "https://kompare.io",
          site_name: "Kompare",
          title: "Kompare &amp; Currency converter Chrome Extension | Home",
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
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1680823364/kompare/favicon_c2gign.ico",
            type: "image/x-icon",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1680820915/kompare/60___60_icon_vmjar1.png",
            sizes: "60x60",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1680820915/kompare/76___76_icon_paxo9q.png",
            sizes: "76x76",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1680820915/kompare/120___120_icon_dq8dce.png",
            sizes: "120x120",
          },
          {
            rel: "apple-touch-icon",
            href: "https://res.cloudinary.com/davien21/image/upload/v1680820915/kompare/152___152_icon_xdwwe0.png",
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
              "Currency converter, stock price tracker, chrome extension",
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
