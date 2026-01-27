'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { IOrder } from '@/models/Order';
import Link from 'next/link';

export default function OrderCard({
  order,
  foodData,
}: {
  order: IOrder;
  foodData: any[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-border mb-4 rounded-xl border bg-white px-4 py-3 shadow-sm">
      <div className="border-border flex items-center justify-between border-b pb-3">
        <div>
          <h1 className="text-sm font-semibold">
            Order{' '}
            <span className="text-neutral-500">
              #{order._id?.toString().slice(-6)}
            </span>
          </h1>
          <p className="mt-1 text-[13px] text-neutral-600">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : 'N/A'}
          </p>
        </div>

        <div className="flex flex-col items-end justify-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full ${
                order.isPaid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              } px-2 py-0.5 text-[11px] font-medium`}
            >
              {order.isPaid ? 'Paid' : 'Unpaid'}
            </span>
            <span
              className={`rounded-full ${
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'pending'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
              } px-2 py-0.5 text-[11px] font-medium`}
            >
              {order.status}
            </span>
          </div>
          {order?.assignedDeliveryBoy &&
            order.status === 'out for delivery' && (
              <Link
                href={`/track-order/${order._id}`}
                className="flex items-center gap-1 text-[13px] font-medium text-neutral-800 underline underline-offset-2"
              >
                track order <ArrowRight size={16} />
              </Link>
            )}
        </div>
      </div>

      <button
        onClick={() => setExpanded((p) => !p)}
        className="mt-3 flex items-center gap-1 text-[13px] font-medium text-neutral-600 hover:text-neutral-800"
      >
        {expanded ? 'Hide items' : 'Show items'}
        <ChevronDown
          size={16}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {order.items.map((item, idx) => {
              const food = foodData?.find((f: any) => f._id === item.foodId);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-neutral-200/60">
                    {food?.image && (
                      <Image
                        src={food.image}
                        alt={food.name}
                        fill
                        sizes="100%"
                        className="object-contain"
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm leading-tight font-medium">
                      {food?.name || 'Food item'}{' '}
                      <span className="text-xs text-neutral-500">
                        {food?.type && `(${food.type})`}
                      </span>
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">Rs. {item.price}</p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="py-3"
      >
        <div className="flex flex-col gap-2 text-[13px]">
          <div className="flex justify-between text-neutral-600">
            <span>Payment</span>
            <span>
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Stripe'}
            </span>
          </div>

          <p className="leading-snug text-neutral-600">
            {order.address.fullAddress}
          </p>

          <div className="flex justify-between pt-1 text-[14px] font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
