'use client';

import fooddroplogo from '@/assets/fooddroplogo.png';
import { motion, MotionConfig } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AnimatedHamburgerButton from './ui/AnimatedHamburgerButton';
export default function Navbar() {
  const [active, setActive] = useState(false);
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center justify-between px-4 md:px-12">
      <h4 className="font-logo text-primary relative cursor-default text-xl">
        <span className="absolute -top-2 right-8 rotate-60 text-7xl text-orange-400">
          /
        </span>
        FoodDrop
      </h4>

      <div className="hidden gap-2 font-medium text-neutral-700 md:gap-4 lg:flex">
        <Link
          href="/register"
          className="border-border cursor-default rounded-xl border-2 px-4 py-1.5 transition-all hover:bg-neutral-200 hover:text-black"
        >
          register
        </Link>
        <Link
          href="/login"
          className="border-border cursor-default rounded-xl border-2 px-6 py-1.5 transition-all hover:bg-neutral-200 hover:text-black"
        >
          login
        </Link>
      </div>

      {/* for mobile */}
      <div className="lg:hidden">
        <AnimatedHamburgerButton active={active} setActive={setActive} />
        <MobileMenu active={active} setActive={setActive} />
      </div>
    </nav>
  );
}

type propType = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({ active, setActive }: propType) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={active ? 'open' : 'closed'}
      variants={{
        open: { opacity: 1, x: 0, transition: { duration: 0.4 } },
        closed: { opacity: 0, x: '-100%', transition: { duration: 0.4 } },
      }}
      className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white"
    >
      <Link
        href="/register"
        className="border-border rounded-xl border-2 px-4 py-1.5"
      >
        register
      </Link>
      <Link
        href="/login"
        className="border-border rounded-xl border-2 px-6.75 py-1.5"
      >
        login
      </Link>
    </motion.div>
  );
};
