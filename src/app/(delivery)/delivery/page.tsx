'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import DeliveryHome from '@/assets/deliveryHome.png';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="flex w-full max-w-xl flex-col items-center gap-4 text-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Image
            src={DeliveryHome}
            alt="FoodDrop Delivery"
            width={480}
            height={480}
            priority
            className="w-full max-w-xs sm:max-w-sm"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -32 }}
          transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
          className="space-y-2"
        >
          <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
            Hey! <br />
            Welcome to <span className="text-primary">FoodDrop</span> Delivery
          </h1>

          <p className="text-sm text-neutral-600 sm:text-base">
            Your one-stop solution for fast and reliable food delivery
          </p>
        </motion.div>
      </div>
    </main>
  );
}
