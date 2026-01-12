'use client';

import Image from 'next/image';
import hamburger from '@/assets/category/hamburger.png';

const categories = [
  { name: 'Pizza', icon: hamburger },
  { name: 'Burgers', icon: hamburger },
  { name: 'Momos', icon: hamburger },
  { name: 'Chowmein', icon: hamburger },
  { name: 'Chatpate', icon: hamburger },
  { name: 'Pani Puri', icon: hamburger },
  { name: 'Biryani', icon: hamburger },
  { name: 'Beverages', icon: hamburger },
  { name: 'Desserts', icon: hamburger },
  { name: 'Bakery', icon: hamburger },
  { name: 'Ice Cream', icon: hamburger },
  { name: 'Drinks', icon: hamburger },
];

export default function CategorySlider() {
  return (
    <div className="w-full overflow-hidden py-6">
      <h1 className="mb-4 text-xl font-semibold">Categories</h1>
      <div className="flex gap-8 overflow-x-auto scroll-smooth">
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
