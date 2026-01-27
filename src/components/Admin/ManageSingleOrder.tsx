'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, User, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { IOrder } from '@/models/Order';

interface Props {
  order: IOrder;
  onStatusChange: (orderId: string, status: string) => void;
}

export default function ManageSingleOrder({ order, onStatusChange }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(order._id!.toString(), newStatus);
  };

  return (
    <div className="border-border mb-4 rounded-xl border bg-white px-4 py-3 shadow-sm">
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
                order.status === 'delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'pending'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              {order.status}
            </span>
          </div>

          {order.status !== 'delivered' && (
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border-border rounded-lg border bg-neutral-50 px-2 py-1 text-[12px] font-medium outline-none"
            >
              <option value="pending">pending</option>
              <option value="out for delivery">out for delivery</option>
            </select>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-2 text-[13px] text-neutral-600">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span>{order.address.fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>{order.address.contact}</span>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={14} className="mt-0.5" />
          <span>{order.address.fullAddress}</span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-[13px] font-medium text-neutral-600"
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
            className="overflow-hidden"
          >
            {order.items.map((item) => (
              <div key={item?.foodId?.toString()} className="flex gap-3 py-3">
                <div className="relative h-11 w-11 rounded-md bg-neutral-200">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="100%"
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-neutral-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">₹{item.price}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {order.assignedDeliveryBoy &&
        typeof order.assignedDeliveryBoy === 'object' &&
        'username' in order.assignedDeliveryBoy && (
          <div className="border-border my-2 flex items-center justify-between rounded-xl border bg-blue-50 p-2">
            <div className="text-[13px] font-medium text-neutral-700">
              <p>assigned to: {(order.assignedDeliveryBoy as any).username}</p>
              <p>contact: {(order.assignedDeliveryBoy as any).contact}</p>
            </div>
            <div className="rounded-md bg-white p-2">
              <a
                href={`tel:+977-${(order.assignedDeliveryBoy as any).contact}`}
              >
                <Phone size={20} className="text-primary" />
              </a>
            </div>
          </div>
        )}

      <div className="mt-3 flex justify-between text-[14px] font-semibold">
        <span>Total</span>
        <span>₹{order.totalAmount}</span>
      </div>
    </div>
  );
}
