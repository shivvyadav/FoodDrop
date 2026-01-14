'use client';

import { motion } from 'framer-motion';
import GoBackButton from '@/components/GoBackButton';
import { AlertTriangle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm"
      >
        {/* ICON */}
        <motion.div
          variants={itemVariants}
          className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100"
        >
          <AlertTriangle className="size-8 text-neutral-700" />
        </motion.div>

        {/* TITLE */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-neutral-900"
        >
          Page Not Found
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={itemVariants}
          className="mt-2 text-sm text-neutral-500"
        >
          The page you’re trying to access doesn’t exist or was moved.
        </motion.p>

        {/* ACTION */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex justify-center"
        >
          <div className="rounded-xl bg-black px-4 py-2 text-white">
            <GoBackButton />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
