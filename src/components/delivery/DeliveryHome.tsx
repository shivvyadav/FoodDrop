'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import { connectWS } from '@/lib/socket';
import { IDeliveryAssignment } from '@/models/DeliveryAssignment';
import { CheckCircle, MapPin, Phone, User, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function DeliveryHome() {
  const [assignments, setAssignments] = useState<IDeliveryAssignment[]>([]);
  const [activeAssignment, setActiveAssignment] = useState<any>();
  const { userData } = useSelector((state: RootState) => state.user);

  async function fetchAssignment() {
    try {
      const res = await axios.get('/api/delivery/get-assignments');
      setAssignments(res.data.allAssignments);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCurrentAssignment() {
    try {
      const res = await axios.get('/api/delivery/current-order');
      console.log(res.data);
      if (res.data.success) {
        setActiveAssignment(res.data.activeAssignment);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect((): any => {
    const socket = connectWS();
    if (!socket) return;

    socket.on('newAssignment', (assignment) => {
      setAssignments((prev) => [assignment, ...prev]);
    });

    return () => socket.off('newAssignment');
  }, []);

  useEffect(() => {
    fetchAssignment();
    fetchCurrentAssignment();
  }, [userData]);

  const handleAccept = async (assignmentId: string) => {
    try {
      const res = await axios.get(
        `/api/delivery/accept-assignment/${assignmentId}`,
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (activeAssignment) {
    return (
      <div className="h-screen px-4 py-20">
        <div className="mx-auto max-w-xl space-y-4 bg-neutral-500">
          <h1 className="ml-1 text-lg font-semibold">Current Delivery</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen px-4 py-20">
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="ml-1 text-lg font-semibold">Available Deliveries</h1>

        {assignments.length === 0 && (
          <p className="ml-1 text-sm text-neutral-500">
            No delivery requests right now.
          </p>
        )}

        {assignments.length > 0 &&
          assignments.map((assignment) => {
            const order = assignment.orderId as any;

            return (
              <motion.div
                key={assignment._id?.toString()}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-xl border border-neutral-400 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-2">
                  <div className="-ml-0.5 flex items-center gap-2">
                    <User size={18} className="text-neutral-500" />
                    <span className="text-sm font-semibold">
                      {order?.address?.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-neutral-600" />
                    <span className="text-xs text-neutral-500">
                      {order?.address?.contact}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-start gap-2 text-[14px] text-neutral-600">
                  <MapPin className="mt-0.5 size-5 sm:size-3.5" />
                  <span className="leading-snug">
                    {order?.address?.fullAddress}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-[14px]">
                  {order?.items?.map((item: any) => (
                    <div
                      key={item?._id}
                      className="flex justify-between text-neutral-600"
                    >
                      <span>
                        {item?.name} × {item?.quantity}
                      </span>
                      <span>₹{item?.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>₹{order?.totalAmount}</span>
                </div>

                <p className="mt-1 text-xs text-neutral-500">
                  Payment:{' '}
                  {order?.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Online'}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() =>
                      handleAccept(assignment._id?.toString() ?? '')
                    }
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-700"
                  >
                    <CheckCircle size={16} />
                    Accept
                  </button>

                  <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition-colors duration-300 hover:bg-red-200">
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
