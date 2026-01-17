'use client';

import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderCancelled() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="flex justify-center"
        >
          <XCircle className="h-20 w-20 text-red-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-2xl font-bold text-gray-900"
        >
          Order Cancelled
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-sm text-gray-600"
        >
          Your order was not completed. If money was deducted, it will be
          refunded according to our policy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-col gap-3"
        >
          <Link
            href="/home"
            className="bg-primary w-full rounded-xl py-3 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            Order Again
          </Link>

          <Link
            href="/home"
            className="w-full rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Go To Home Page
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
