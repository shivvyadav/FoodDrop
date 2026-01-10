'use client';
import { motion } from 'motion/react';
import LeftSvg from './ui/LeftSvg';
import RightSvg from './ui/RightSvg';
import Image from 'next/image';
import homeburger from '@/assets/homeburger.png';
import pizzahome from '@/assets/pizzahome.png';
import homemomo from '@/assets/homemomo.png';
export default function Hero() {
  return (
    <div className="relative z-10 w-full overflow-hidden">
      <LeftSvg />
      <RightSvg />

      <Images />

      <section className="flex h-[90vh] flex-col items-center justify-center bg-linear-to-b from-neutral-50 to-white md:h-screen">
        <div className="text-primary font-logo flex flex-col text-center text-3xl font-black tracking-wider md:text-5xl lg:text-6xl lg:leading-18">
          <p>good food for</p>
          <p>good mood</p>
        </div>
        <div className="font-heading mt-6 w-2/4 text-center tracking-wide text-neutral-500 md:w-full lg:text-xl">
          <p>For over a decade, we’ve enabled our</p>{' '}
          <p>customers to discover new tastes,</p>{' '}
          <p>delivered right to their doorstep</p>
        </div>
      </section>

      {/* More content */}
      <section className="flex h-screen items-center justify-center rounded-b-4xl bg-white">
        <h2 className="text-4xl font-bold">More Content</h2>
      </section>

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
