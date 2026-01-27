'use client';
import { motion } from 'motion/react';
import LeftSvg from './ui/LeftSvg';
import RightSvg from './ui/RightSvg';
import Image from 'next/image';
import homeburger from '@/assets/homeburger.png';
import pizzahome from '@/assets/pizzahome.png';
import homemomo from '@/assets/homemomo.png';
import city from '@/assets/main/city.png';
import location from '@/assets/main/location.png';
import restraunt from '@/assets/main/restraunt.png';

import FeaturesShowcase from './Featured';
export default function Hero() {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <LeftSvg />
      <RightSvg />

      <Images />

      <section className="flex h-[90vh] flex-col items-center justify-center bg-linear-to-b from-neutral-50 to-white">
        <div className="text-primary font-logo flex flex-col text-center text-4xl font-black tracking-wider md:text-5xl lg:text-6xl lg:leading-18">
          <p>good food for</p>
          <p>good mood</p>
        </div>
        <div className="font-heading mt-6 w-2/4 text-center tracking-wide text-neutral-500 md:w-full lg:text-xl">
          <p>For over a decade, we’ve enabled our</p>{' '}
          <p>customers to discover new tastes,</p>{' '}
          <p>delivered right to their doorstep</p>
        </div>
      </section>

      <section className="flex justify-center bg-white px-4">
        <LargerCard />
        <div className="relative">
          <SmallCard />
        </div>
      </section>

      <div className="flex flex-col items-center justify-center rounded-b-2xl bg-white pt-12 md:pt-24 lg:rounded-b-4xl">
        <FeaturesShowcase />
        <JOIN />
      </div>

      {/* FINAL REVEAL SECTION */}
      <section className="flex h-80 items-center justify-center opacity-0" />
    </div>
  );
}

const Images = () => {
  return (
    <>
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute top-64 left-1 md:left-10 lg:left-24 xl:left-40"
      >
        <Image
          src={homeburger}
          alt="hero"
          width={100}
          height={100}
          className="size-28 md:size-40 lg:size-46 xl:size-60"
        />
      </motion.div>
      <motion.div
        initial={{ x: 400, y: -200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute top-16 right-6 md:right-14 lg:right-32 xl:right-48"
      >
        <Image
          src={pizzahome}
          alt="hero"
          width={100}
          height={100}
          className="size-28 md:size-40 lg:size-44 xl:size-58"
        />
      </motion.div>
      <motion.div
        initial={{ x: 400, y: 200 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="absolute top-92 -right-3 md:right-2 lg:right-12 xl:right-24"
      >
        <Image
          src={homemomo}
          alt="hero"
          width={100}
          height={100}
          className="size-40 -rotate-12 md:size-56 lg:size-64 xl:size-76"
        />
      </motion.div>
    </>
  );
};

const LargerCard = () => {
  return (
    <div className="border-border mx-auto hidden w-fit max-w-5xl items-center justify-center gap-8 rounded-2xl border px-4 py-3 text-slate-600 shadow-xs md:flex lg:rounded-4xl lg:px-7 lg:py-6 2xl:mt-14 2xl:gap-12">
      <div className="flex items-center">
        <div>
          <div className="text-2xl font-bold lg:text-3xl 2xl:text-4xl">10+</div>
          <div className="text-slateGrey md:text-base lg:text-lg">
            categories
          </div>
        </div>
        <Image
          src={restraunt}
          alt="menu icon"
          height={60}
          width={60}
          style={{ width: 'auto', height: 'auto' }}
          className="ml-4 2xl:ml-8"
        />
      </div>
      <div className="border-border h-9 w-1 border-l lg:h-12 xl:h-16" />
      <div className="flex items-center">
        <div>
          <div className="text-comet text-2xl font-bold lg:text-3xl 2xl:text-4xl">
            20+
          </div>
          <div className="text-slateGrey md:text-base lg:text-lg">cities</div>
        </div>
        <Image
          src={location}
          height={40}
          width={40}
          alt="menu icon"
          style={{ width: 'auto', height: 'auto' }}
          className="ml-4 2xl:ml-8"
        />
      </div>
      <div className="border-border h-9 w-1 border-l lg:h-12 xl:h-16" />
      <div className="flex items-center">
        <div>
          <div className="text-comet text-2xl font-bold lg:text-3xl 2xl:text-4xl">
            3 million+
          </div>
          <div className="text-slateGrey md:text-base lg:text-lg">
            orders delivered
          </div>
        </div>
        <Image
          src={city}
          alt="menu icon"
          height={50}
          width={50}
          style={{ width: 'auto', height: 'auto' }}
          className="ml-4 2xl:ml-8"
        />
      </div>
    </div>
  );
};
const SmallCard = () => {
  return (
    <div className="grid w-66 grid-cols-4 grid-rows-3 md:hidden">
      <div className="col-span-3 row-span-1">
        <div className="border-border w-full rounded-xl border bg-white py-3 pl-4 shadow-[0px_4px_19.299999237060547px_0px_rgba(0,0,0,0.09)]">
          <div className="flex flex-row items-center justify-start gap-4">
            <div>
              <div className="text-comet text-xl font-bold">10+</div>
              <div className="text-slateGrey text-xs font-medium">
                categories
              </div>
            </div>
            <div className="self-center justify-self-center">
              <Image
                src={restraunt}
                height={40}
                width={40}
                alt="restaurants icon"
                loading="lazy"
                className="max-h-10 w-auto object-fill"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 col-start-3 row-start-2 w-full -translate-y-4 rotate-[9deg]">
        <div className="border-border w-full rounded-xl border bg-white py-3 pl-4 shadow-[0px_4px_19.299999237060547px_0px_rgba(0,0,0,0.09)]">
          <div className="flex flex-row items-center justify-start gap-4">
            <div>
              <div className="text-comet text-xl font-bold">20+</div>
              <div className="text-slateGrey text-xs font-medium">cities</div>
            </div>
            <div className="self-center justify-self-center">
              <Image
                src={location}
                height={40}
                width={40}
                alt="cities icon"
                loading="lazy"
                className="max-h-10 w-auto object-fill"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders */}
      <div className="col-span-3 row-span-1 row-start-3 w-[95%] translate-x-4 -translate-y-7 -rotate-2">
        <div className="border-border w-full rounded-xl border bg-white py-3 pl-4 shadow-[0px_4px_19.299999237060547px_0px_rgba(0,0,0,0.09)]">
          <div className="flex flex-row items-center justify-start gap-4">
            <div>
              <div className="text-comet text-xl font-bold">3 million+</div>
              <div className="text-slateGrey text-xs font-medium">
                orders delivered
              </div>
            </div>
            <div className="self-center justify-self-center">
              <Image
                src={city}
                height={40}
                width={40}
                alt="orders icon"
                loading="lazy"
                className="h-auto max-h-10 w-auto object-fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JOIN = () => {
  return (
    <div className="border-border my-16 flex h-40 w-80 flex-col items-center justify-center rounded-2xl border-2 bg-linear-to-t from-rose-50 to-white px-4 md:my-24 md:h-56 md:w-162 lg:h-68 lg:w-3xl lg:rounded-3xl xl:h-74 xl:w-5xl xl:rounded-4xl">
      <h1 className="text-primary font-bold lg:text-3xl xl:text-4xl">
        Join Our Member And{' '}
      </h1>
      <h2 className="mt-2 text-center text-sm font-semibold text-neutral-500 lg:text-lg">
        Experience seamless online ordering only on the FoodDrop
      </h2>
    </div>
  );
};
