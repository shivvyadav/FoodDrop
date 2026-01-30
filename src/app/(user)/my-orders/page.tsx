'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

import OrderCard from '@/components/user/OrderCard';
import useGetUserOrders from '@/hooks/useGetUserOrders';
import { RootState } from '@/redux/store';

export default function MyOrderPage() {
  const { foodData } = useSelector((state: RootState) => state.food);
  const { orderData } = useSelector((state: RootState) => state.order);

  useGetUserOrders();

  return (
    <div className="min-h-screen bg-gray-50 px-3 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="border-border sticky top-0 z-40 mb-6 border-b bg-neutral-50/0 py-5 backdrop-blur-lg">
          <div className="flex items-center gap-8">
            <Link
              href="/home"
              className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="text-lg font-semibold">Your Orders</h1>
          </div>
        </div>

        {orderData.length === 0 && (
          <p className="mt-4 text-center font-medium text-gray-600">
            No orders found
          </p>
        )}

        {orderData.map((order: any) => (
          <OrderCard
            key={order._id?.toString()}
            order={order}
            foodData={foodData}
          />
        ))}
      </motion.div>
    </div>
  );
}
