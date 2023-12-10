import React from "react";

import {
  Header,
  Footer,
  CountDownBox,
  Button,
  CloudinaryImage,
  Faq,
} from "components";

import styles from "./home-page.module.scss";
import { DiscordIcon, TelegramIcon, TwitterIcon } from "assets/images";
import { currentQuestionsData, questionsData } from "data/dummy";
function HomePage() {
  return (
    <>
      <Header />
      <main className={`${styles["container"]}`}>
        <section className={`${styles["one"]}`}>
          <div className="container py-10">
            <div className="flex justify-around flex-wrap md:flex-nowrap gap-y-20">
              <div className="my-auto mx-auto md:mx-0 max-w-[495px] text-center md:text-left">
                <h1 className={`${styles["header"]} font-header pl-3.5 mb-6`}>
                  Cash the chaos flip the skyline
                </h1>
                <p className="text-lg mb-14 sm:text-xl text-center md:text-left">
                  City Boys Coin, where every neon light could be your next
                  crypto green. Turn your hustle into your empire.
                </p>
                <div className="gap-6 flex flex-wrap sm:flex-nowrap justify-center md:justify-start">
                  <Button form="tertiary" href="" target="_blank">
                    JOIN DISCORD
                  </Button>
                  <Button form="primary">READ CITYPAPER</Button>
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-center">
                <CountDownBox />
              </div>
            </div>
          </div>

          <div
            className={`${styles["illustration-img-1"]} container-fluid px-0 2xl:px-40`}
          >
            <CloudinaryImage
              src="https://res.cloudinary.com/davien21/image/upload/v1694006576/city-boys/illustration_1_lnr95v.png"
              height={1123}
              width={1440}
            />
          </div>
        </section>
        <section className={`${styles["two"]}`}>
          <div className="container">
            <div className="text-center uppercase flex justify-center">
              <h2 className="font-secondary font-bold">
                {`“I didn't just choose the City Life. I commanded it, conquered
                it, made it kneel before me. That's the City Boys' way, Because
                in this concrete jungle, only the mightiest roar.”`}
              </h2>
            </div>
          </div>
          <div
            className={`${styles["illustration-img-2"]} container-fluid px-0`}
          >
            <div className="sm:hidden">
              <CloudinaryImage
                src="https://res.cloudinary.com/davien21/image/upload/v1694012791/city-boys/illustration-2_jlv6zw.png"
                height={833}
                width={1440}
                className=""
              />
            </div>
            <div className="hidden sm:flex">
              <CloudinaryImage
                src="https://res.cloudinary.com/davien21/image/upload/v1694012791/city-boys/illustration-2_jlv6zw.png"
                height={833}
                width={1440}
                className=""
              />
            </div>
          </div>
        </section>
        <section className={`${styles["three"]}`}>
          <div className="container sm:px-20 xl:px-40">
            <div className="grid md:grid-cols-8 gap-y-4 py-16 md:pt-50">
              <div className="md:col-span-3">
                <h2 className="md:max-w-[300px] m- auto font-header font-bold">
                  About Our city
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm md:text-lg">
                  Are your dreams rusting like forgotten relics in the urban
                  labyrinth? Come ride with us on this grind, and {`let's`}{" "}
                  reclaim our city, brick by brick, block by block with $CTB.{" "}
                  <br />
                  $CTB {`isn't`} merely a token; {`it's`} a revolution fueled by
                  the grit to retake {`what's`} ours, solidarity, and the hustle
                  to construct empires in this web3 chaos. As City Boys, we
                  hoist the flag of the urban pulse: iron will, streetwise
                  tactics, and a swagger that lights up the city nights. With
                  our token,
                  {`you're`} not just chasing the next moonshot, {`you're`}
                  strategizing, grinding, and reconquering your city, one
                  district at a time. <br /> <br /> Join our movement, feel the
                  rush of the concrete under your feet, transform those setbacks
                  into skyscrapers. Dwn your {`city's`} colors, rep your
                  streets. Because city life {`isn't`} just a game, {`it's`} the
                  ultimate hustle. And us City Boys? {`We're`} the players
                  making the plays, not the pawns.
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles["illustration-img-3"]} `}>
            <div className="flex sm:hidden">
              <CloudinaryImage
                src="https://res.cloudinary.com/davien21/image/upload/v1694368522/city-boys/illustration-3_1_fcurz8.png"
                height={576 * 1.5}
                width={1440}
                className=""
              />
            </div>
            <div className="hidden sm:flex">
              <CloudinaryImage
                src="https://res.cloudinary.com/davien21/image/upload/v1694368522/city-boys/illustration-3_1_fcurz8.png"
                height={576 * 2}
                width={1440 * 2}
                className=""
              />
            </div>
          </div>
        </section>
        <section className={`${styles["four"]}`}>
          <div className="container">
            <div className="m-auto md:m-0 max-w-[650px] gap-y-4 py-16 md:pt-20">
              <div className="md:col-span-3">
                <h2 className="font-header font-bold mb-5 sm:mb-10">
                  Join the City Council
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="md:text-lg mb-10 md:mb-5">
                  {`Join the Cityboys Syndicate, born and bred in the heart of
                  crypto, and experience the might of the metropolis as you ride
                  with the City crew. Our Syndicate embodies our ethos and
                  hustle, carrying the fervor to etch our city onto the crypto
                  landscape. With no guarantees, except our communal grind, it's
                  time to represent your city by securing your $CTB.`}
                  <br /> <br />{" "}
                  {`Join in on the crucial discussions in our
                  council, link up with fellow City Boys, and help elevate the
                  city to uncharted heights.`}
                </p>
                <div className="flex gap-x-6">
                  <div className={`${styles["sm-icons"]}`}>
                    <TwitterIcon />
                  </div>
                  <div className={`${styles["sm-icons"]}`}>
                    <TelegramIcon />
                  </div>
                  <div className={`${styles["sm-icons"]}`}>
                    <DiscordIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles["illustration-img-4"]} contain er-fluid `}>
            <div className="flex">
              <CloudinaryImage
                src="https://res.cloudinary.com/davien21/image/upload/v1694386258/city-boys/Illustration-4_gqr0tp.png"
                width={1516}
                height={1078}
                className=""
              />
            </div>
          </div>
        </section>
        <section className={`${styles["five"]}`}>
          <div className="container">
            <div className="grid md:grid-cols-8 items-center justify-center">
              <div className="md:col-span-4 ">
                {/* <CoinsImg /> */}
                <div className="flex justify-center md:justify-start">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/davien21/image/upload/v1696452748/city-boys/Frame_5_vxqq8i.png"
                    width={473}
                    height={315}
                    className=""
                  />
                </div>
              </div>
              <div
                className={`${styles["coin-stats"]} max-w-[679px] m-auto te xt-center md:col-span-4`}
              >
                <div className="rounded-[20px] py-4 px-16 border items-center border-[#FFEC4A] flex justify-between gap-x-10 mb-10">
                  <span className="font- bold font-secondary">
                    PRESALE PRICE
                  </span>
                  <span className="text-3xl font-bold">1 CTB = 1 ADA</span>
                </div>
                <div className="flex text-center sm:text-left m-auto justify-center flex-wrap sm:grid sm:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-6">
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">
                      Network
                    </p>
                    <p className="text-3xl font-semibold text-grey-1">
                      Cardano
                    </p>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">Ticker</p>
                    <p className="text-3xl font-semibold">CTB</p>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">
                      Token Name
                    </p>
                    <p className="text-3xl font-semibold">CityBoys Token</p>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">
                      Token Supply
                    </p>
                    <p className="text-3xl font-semibold">4 Million</p>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">
                      % Sold In Presale
                    </p>
                    <p className="text-3xl font-semibold">100%</p>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="text-sm text-grey-2 font-secondary">
                      Tokens Available
                    </p>
                    <p className="text-3xl font-semibold">4,000,000</p>
                  </div>
                </div>
                <Button
                  href=""
                  target="_blank"
                  form="primary"
                  className="mt-16"
                >
                  READ FULL CITYNOMICS
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles["six"]}`}>
          <div className="container">
            <div className="grid md:grid-cols-8 items-center justify-center">
              <div className="md:col-span-4 order-2 md:order-1">
                <div className="mt-24 md:mt-14 flex justify-center md:justify-start">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/davien21/image/upload/v1696482698/city-boys/lights_lceaeo.png"
                    width={480}
                    height={824}
                    className=""
                  />
                </div>
              </div>
              <div
                className={`${styles["coin-stats"]}  order-1 md:order-2 max-w-[679px] m-au to te xt-center md:col-span-4`}
              >
                <h2 className="font-header font-bold mb-6 sm:mb-12">CityMap</h2>
                <div className="flex flex-wrap m-a uto justif y-center sm:grid sm:grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-8">
                  <div className="col-span-1 gap-y-1">
                    <p className="mb-4 uppercase text-xl text-red-3 font-secondary">
                      First Phase
                    </p>
                    <ul className="text-grey-1">
                      <li>City Research</li>
                      <li>First Founding Fathers of The City</li>
                      <li>Meeting</li>
                      <li>City Paper Release</li>
                      <li>$CTB Presale Live</li>
                    </ul>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="mb-4 uppercase text-xl text-orange font-secondary">
                      Second Phase
                    </p>
                    <ul className="text-grey-1">
                      <li>Exchange (CEX and DEX Listings)</li>
                      <li>Coinmarketcap & Coingecko Listings</li>
                      <li>Secure partnerships with Well Known Urban Brands</li>
                    </ul>
                  </div>
                  <div className="col-span-1 gap-y-1">
                    <p className="mb-4 uppercase text-xl text-orange font-secondary">
                      Third Phase
                    </p>
                    <ul className="text-grey-1">
                      <li>Cityverse (First Urban Styled Metaverse)</li>
                      <li>
                        City Burn (Burn Your $CTB Token To Mint Your Cityverse)
                      </li>
                      <li>More partnerships</li>
                      <li>CityVerse RPG Game Release</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`${styles["seven"]}`}>
          <div className="container">
            <div className="">
              <div
                className={`${styles["coin-stats"]} max-w-[733px] m-auto te xt-center `}
              >
                <h2 className="text-center font-header font-bold mb-6 sm:mb-8">
                  Word on the street
                </h2>
                <Faq data={currentQuestionsData} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <CloudinaryImage
              src="https://res.cloudinary.com/davien21/image/upload/v1696522115/city-boys/bg-8_iqqa5a.png"
              width={1440 * 1.5}
              height={1063 * 1.5}
              className=""
            />
          </div>
        </section>
        <section className={`${styles["eight"]}`}>
          <div className="container">
            <div className="flex justify-center">
              <p className="uppercase leading-7 sm:leading-10 text-center sm:text-2xl font-secondary max-w-[889px]">
                In your locality, cryptocurrency may not fall under regulatory
                oversight. The worth of cryptocurrencies may fluctuate,
                decreasing as well as increasing. Any profits accrued may be
                subject to capital gains taxes or other applicable levies as per
                the laws of your jurisdiction.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
