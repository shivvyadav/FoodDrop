'use client';

import { IFood } from '@/models/Food';
import Image from 'next/image';
import { useState } from 'react';
import EditFoodModal from './EditFoodModal';
import { AnimatePresence } from 'motion/react';

export default function ViewFoodCard({ food }: { food: IFood }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="border-border flex items-start justify-between rounded-2xl border p-2 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="size-20 overflow-hidden rounded-lg bg-neutral-100">
            <Image
              src={food.image}
              alt={food.name}
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-2">
            <p className="font-semibold text-neutral-800">{food.name}</p>
            <p className="text-xs text-neutral-500">{food.type}</p>
          </div>
        </div>

        <div className="m-2 flex flex-col items-end">
          <p className="font-semibold text-neutral-800">Rs. {food.price}</p>
          <button
            onClick={() => setShowEdit(true)}
            className="border-border mt-2 cursor-pointer rounded-lg border bg-neutral-50 px-4 py-1 text-sm font-medium transition-transform duration-300 active:scale-95"
          >
            Edit
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showEdit && (
          <EditFoodModal food={food} onClose={() => setShowEdit(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
