'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { connectWS } from '@/lib/socket';
import {
  prependOrder,
  updateAssignedDeliveryBoy,
} from '@/redux/slices/allOrderSlice';

export default function useUserSocket() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.user.userData?._id);

  useEffect(() => {
    if (!userId) return;
    const socket = connectWS();

    socket.on('orderCreated', (order) => {
      dispatch(prependOrder(order));
    });

    socket.on('orderAccepted', (data) => {
      console.log(data);
      dispatch(updateAssignedDeliveryBoy(data));
    });

    return () => {
      socket.off('orderCreated');
      socket.off('orderAccepted');
    };
  }, [userId, dispatch]);
}
