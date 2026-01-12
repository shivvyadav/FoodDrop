'use client';
import { useState } from 'react';
import homeburger from '@/assets/homeburger.png';
import homemomo from '@/assets/homemomo.png';
import carouselmomo from '@/assets/carouselmomo.png';
import Image from 'next/image';
import { ChevronLeft, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [homeburger, homemomo, carouselmomo];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <section className="rounded-xl bg-zinc-800 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-10 pb-4 md:grid-cols-2 md:gap-12 lg:pb-16">
        {/* Text */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-6xl">
            Order Your <span className="text-orange-400">Favorite</span> Foods
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm text-zinc-400 sm:text-base md:mx-0">
            Fresh, delicious meals delivered fast — no nonsense, no delays.
          </p>

          {/* Mobile carousel */}
          <div className="mt-6 flex justify-center md:hidden">
            <div className="relative flex h-72 w-72 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <Image
                    src={images[index]}
                    priority
                    alt="Food"
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                onClick={prev}
                className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-black/60 p-2"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-black/60 p-2"
              >
                <ChevronLeft size={22} className="rotate-180" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex flex-wrap justify-center gap-4 md:justify-start">
            <button className="rounded-3xl bg-orange-400 px-6 py-2 text-sm font-medium text-black hover:bg-orange-500">
              View Menu
            </button>
            <button className="rounded-3xl border border-zinc-500 px-6 py-2 text-sm text-zinc-200 hover:bg-zinc-700">
              Order Now
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <p className="text-xs text-zinc-400">4.9 / 5 ⭐</p>
            <p className="text-2xl font-bold">1000+</p>
            <p className="text-xs text-zinc-500">Reviews</p>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="relative order-1 hidden justify-center md:flex">
          <div className="relative">
            <div className="relative flex h-72 w-72 items-center justify-center overflow-hidden sm:h-80 sm:w-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <Image
                    src={images[index]}
                    priority
                    alt="Food"
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Badge */}
            <div className="absolute top-10 right-8 rounded-full bg-black/40 px-4 py-2 text-xs font-medium backdrop-blur-md">
              Fastest Delivery 🚚
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full bg-zinc-700 p-2 hover:bg-zinc-600"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full bg-zinc-700 p-2 hover:bg-zinc-600"
            >
              <ChevronLeft size={22} className="rotate-180" />
            </button>

            {/* Product */}
            <div className="mt-4 text-center">
              <p className="text-sm text-zinc-400">Burger</p>
              <p className="text-xl font-bold">Rs. 100</p>
              <button className="mt-2 rounded-full bg-orange-400 p-2 text-black hover:bg-orange-300">
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
