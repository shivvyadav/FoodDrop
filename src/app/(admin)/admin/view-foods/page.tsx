'use client';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';
import { motion } from 'motion/react';
import ViewFoodCard from '@/components/Admin/ViewFoodCard';
import { IFood } from '@/models/Food';

export default function ViewFoods() {
  const { foodData, isLoaded } = useSelector((state: RootState) => state.food);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="mx-auto mb-8 max-w-2xl px-4 pt-22 md:pt-24"
    >
      {foodData.length ? (
        <h1 className="mb-4 text-lg font-bold text-neutral-800">Food Items</h1>
      ) : (
        <h1 className="mb-4 text-lg font-bold text-neutral-800">
          No food items found
        </h1>
      )}
      <div className="flex flex-col gap-4">
        {foodData.map((food: IFood) => {
          return <ViewFoodCard key={food._id?.toString()} food={food} />;
        })}
      </div>
    </motion.div>
  );
}
