'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { connectWS } from '@/lib/socket';
import {
  prependOrder,
  updateOrderStatus,
  updateAssignedDeliveryBoy,
} from '@/redux/slices/orderSlice';

export default function useUserSocket() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.user.userData?._id);

  useEffect(() => {
    if (!userId) return;

    const socket = connectWS();
    socket.emit('identity', userId);

    socket.on('orderCreated', (order) => {
      if (order.userId?.toString() === userId.toString()) {
        dispatch(prependOrder(order));
      }
    });

    socket.on('orderStatusUpdated', (data) => {
      dispatch(
        updateOrderStatus({
          orderId: data.orderId,
          status: data.status,
        }),
      );
    });

    socket.on('orderAccepted', (data) => {
      dispatch(updateAssignedDeliveryBoy(data));
    });

    return () => {
      socket.off('orderCreated');
      socket.off('orderStatusUpdated');
      socket.off('orderAccepted');
    };
  }, [userId, dispatch]);
}
