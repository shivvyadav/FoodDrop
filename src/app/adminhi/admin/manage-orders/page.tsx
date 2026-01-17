'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ChevronDown, Loader2, User, Phone, MapPin } from 'lucide-react';
import { IOrder } from '@/models/Order';

export default function ManageOrders() {
  const [orders, setOrders] = useState<[] | IOrder[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get('/api/admin/get-orders');
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Loader2 className="text-primary size-14 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto mt-26 mb-8 w-full max-w-4xl px-4 md:max-xl:px-16"
      >
        {orders.map((order) => {
          const expanded = expandedOrderId === order._id?.toString();

          return (
            <div
              key={order._id?.toString()}
              className="border-border mb-4 rounded-xl border bg-white px-4 py-3 shadow-sm"
            >
              {/* Header */}
              <div className="border-border flex items-start justify-between gap-3 border-b pb-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">
                    Order #{order._id?.toString().slice(-6)}
                  </p>
                  <p className="text-[13px] text-neutral-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        order.isPaid
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        order.status === 'pending'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <select
                    value={order.status}
                    className="border-border rounded-lg border bg-neutral-50 px-2 py-1 text-[12px] font-medium outline-none"
                  >
                    <option value="pending">pending</option>
                    <option value="out for delivery">out for delivery</option>
                  </select>
                </div>
              </div>

              {/* User & Address */}
              <div className="mt-3 space-y-2 text-[13px] text-neutral-600">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>{order.userId?.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <span>{order.userId?.contact}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5" />
                  <span className="leading-snug">
                    {order.address.fullAddress}
                  </span>
                </div>
              </div>

              {/* Toggle Items */}
              <button
                onClick={() =>
                  setExpandedOrderId(expanded ? null : order._id!.toString())
                }
                className="mt-3 flex items-center gap-1 text-[13px] font-medium text-neutral-600 hover:text-neutral-800"
              >
                {expanded ? 'Hide items' : 'Show items'}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Items */}
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    {order.items.map((item) => (
                      <motion.div
                        key={item._id?.toString()}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 py-3"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-neutral-200">
                          {item.foodId?.image && (
                            <Image
                              src={item.foodId?.image}
                              alt={item.foodId?.name}
                              fill
                              sizes="100%"
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {item.foodId?.name}
                          </p>
                          <p className="text-xs text-neutral-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">₹{item.price}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-3 flex justify-between text-[14px] font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
