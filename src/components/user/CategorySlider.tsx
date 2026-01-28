'use client';

import Image from 'next/image';
import hamburger from '@/assets/category/cheese-burger.png';
import pizza from '@/assets/category/pizza.png';
import momo from '@/assets/category/momo.png';
import chowmein from '@/assets/category/ramen.png';
import chatpate from '@/assets/category/chatpate.png';
import panipuri from '@/assets/category/pani-puri.png';
import biryani from '@/assets/category/biryani.png';
import beverages from '@/assets/category/drink.png';
import desserts from '@/assets/category/ice.png';
import bakery from '@/assets/category/cake.png';
import icecream from '@/assets/category/ice.png';
import drinks from '@/assets/category/soft-drink.png';

const categories = [
  { name: 'Pizza', icon: pizza },
  { name: 'Burgers', icon: hamburger },
  { name: 'Momos', icon: momo },
  { name: 'Chowmein', icon: chowmein },
  { name: 'Chatpate', icon: chatpate },
  { name: 'Pani Puri', icon: panipuri },
  { name: 'Biryani', icon: biryani },
  { name: 'Beverages', icon: beverages },
  { name: 'Desserts', icon: desserts },
  { name: 'Bakery', icon: bakery },
  { name: 'Ice Cream', icon: icecream },
  { name: 'Drinks', icon: drinks },
];

export default function CategorySlider() {
  return (
    <div className="w-full overflow-hidden py-6">
      <h1 className="mb-4 text-xl font-semibold">Categories</h1>
      <div className="hide-scrollbar flex gap-8 overflow-x-auto scroll-smooth">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-zinc-100 md:size-19">
              <Image
                src={cat.icon}
                alt={cat.name}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <p className="text-xs font-medium text-zinc-700 md:text-sm">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
