import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import {
  setAssignments,
  setActiveAssignment,
} from '@/redux/slices/deliverySlice';

export default function useDelivery() {
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.user);
  const { initialized } = useSelector((state: RootState) => state.delivery);

  useEffect(() => {
    if (!userData?._id) return;
    if (initialized) return;

    const fetchData = async () => {
      try {
        const [assignmentsRes, activeRes] = await Promise.all([
          axios.get('/api/delivery/get-assignments'),
          axios.get('/api/delivery/current-order'),
        ]);

        const assignments = assignmentsRes.data.allAssignments || [];
        const activeAssignment = activeRes.data.success
          ? activeRes.data.activeAssignment
          : null;

        dispatch(setAssignments(assignments));
        if (activeAssignment) dispatch(setActiveAssignment(activeAssignment));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userData?._id, initialized, dispatch]);
}
