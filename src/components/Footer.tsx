import React from 'react';
import Image from 'next/image';
import fooddroplogo from '@/assets/fooddroplogo.png';
import {
  IconBrandFacebookFilled,
  IconBrandInstagramFilled,
  IconBrandYoutubeFilled,
  IconBrandXFilled,
} from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-0 flex h-88 w-full flex-col items-center justify-center bg-black text-white">
      <section className="flex w-full flex-col items-center justify-center">
        <Image
          src={fooddroplogo}
          alt="logo"
          width={100}
          height={100}
          className="w-16 md:w-40"
        />
        <h4 className="text-primary font-logo text-2xl">FoodDrop</h4>
      </section>
      <section className="absolute bottom-0 flex w-full items-center justify-between bg-neutral-800 px-4 py-4 md:w-3/4 md:rounded-t-3xl md:px-8">
        <h4 className="text-primary font-logo text-xl">FoodDrop</h4>
        <p className="md:text-md text-center text-xs text-neutral-400 md:text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <span className="block md:inline">~ All rights reserved</span>
        </p>
        <div className="flex gap-1 md:gap-2">
          <IconBrandInstagramFilled className="size-6.5 text-rose-500" />
          <IconBrandFacebookFilled className="size-6 text-blue-500" />
          <IconBrandYoutubeFilled className="size-6 text-red-500" />
          <IconBrandXFilled className="size-6 text-black" />
        </div>
      </section>
    </footer>
  );
}
