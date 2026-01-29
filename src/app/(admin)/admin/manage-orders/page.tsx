'use client';

import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { updateOrderStatus } from '@/redux/slices/allOrderSlice';
import ManageSingleOrder from '@/components/Admin/ManageSingleOrder';
import toast from 'react-hot-toast';

export default function ManageOrders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, fetched } = useSelector((state: RootState) => state.allOrder);

  const onStatusChange = async (orderId: string, status: string) => {
    try {
      const res = await axios.post(
        `/api/admin/update-order-status/${orderId}`,
        { status },
      );
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateOrderStatus({ orderId, status: status as any }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!fetched) {
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
      className="mx-auto max-w-4xl px-4 pt-26 pb-4"
    >
      {orders.length === 0 && (
        <h1 className="mb-4 text-lg font-medium text-neutral-800">
          No orders found
        </h1>
      )}
      {orders.map((order: any) => (
        <ManageSingleOrder
          key={order._id?.toString()}
          order={order}
          onStatusChange={onStatusChange}
        />
      ))}
    </motion.div>
  );
}
