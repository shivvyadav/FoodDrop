'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { connectWS } from '@/lib/socket';
import { addAssignment } from '@/redux/slices/deliverySlice';
import { IDeliveryAssignment } from '@/models/DeliveryAssignment';

export default function useDeliveryBoySocket() {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((s: RootState) => s.user.userData?._id);

  useEffect(() => {
    if (!userId) return;

    const socket = connectWS();
    socket.emit('identity', userId);

    const handleNewAssignment = (assignment: IDeliveryAssignment) => {
      dispatch(addAssignment(assignment));
    };
    socket.on('newAssignment', handleNewAssignment);

    return () => {
      socket.off('newAssignment', handleNewAssignment);
    };
  }, [userId, dispatch]);

  return null;
}
