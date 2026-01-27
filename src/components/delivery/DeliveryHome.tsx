'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AnimatePresence, motion } from 'motion/react';
import { connectWS } from '@/lib/socket';
import {
  CheckCircle,
  Hash,
  Loader,
  MapPin,
  MessageCircle,
  Phone,
  User,
  Wallet,
  X,
  XCircle,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  clearActiveAssignment,
  setActiveAssignment,
} from '@/redux/slices/deliverySlice';
const LiveMapTracking = dynamic(() => import('@/components/LiveMapTracking'), {
  ssr: false,
});
import ChatMessageBox from '../ChatMessageBox';
import dynamic from 'next/dynamic';
import OtpVerification from './OtpVerification';
import toast from 'react-hot-toast';

export default function DeliveryHome() {
  const { userData } = useSelector((state: RootState) => state.user);
  const { assignments, activeAssignment } = useSelector(
    (state: RootState) => state.delivery,
  );
  const dispatch = useDispatch();
  const socketRef = useRef<ReturnType<typeof connectWS> | null>(null);

  const [userLocation, setUserLocation] = useState<any>();
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<
    [number, number] | null
  >(null);

  const [showChat, setShowChat] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!activeAssignment) return;

    setUserLocation([
      activeAssignment.address.latitude,
      activeAssignment.address.longitude,
    ]);
  }, [activeAssignment]);

  useEffect(() => {
    if (!activeAssignment || !userData?._id) return;
    if (!navigator.geolocation) return;
    const cached = localStorage.getItem('lastLocation');
    if (cached) {
      setDeliveryBoyLocation(JSON.parse(cached));
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;

        setDeliveryBoyLocation([lat, long]);
        localStorage.setItem('lastLocation', JSON.stringify([lat, long]));

        socketRef.current?.emit('updateLocation', {
          userId: userData._id,
          lat,
          long,
        });
      },
      console.error,
      { enableHighAccuracy: true },
    );

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, [activeAssignment, userData?._id]);

  // accept an assignment
  const handleAccept = async (assignmentId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/delivery/accept-assignment/${assignmentId}`,
      );
      console.log(res.data);
      if (res.data.success) {
        const assignment = res.data.order;
        dispatch(setActiveAssignment(assignment));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async () => {
    if (!activeAssignment) return;
    setOtpVisible(true);
    try {
      await axios.post('/api/otp/send-otp', {
        userId: activeAssignment.userId.toString(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // OTP verification callback
  const handleVerifyOtp = async (otp: string) => {
    console.log('OTP entered:', otp);

    try {
      const res = await axios.post('/api/otp/verify-otp', {
        userId: activeAssignment.userId.toString(),
        verifyCode: otp,
        orderId: activeAssignment._id,
      });

      if (res.data.success) {
        toast.success('Order Delivered ');
        setOtpVisible(false);
        dispatch(clearActiveAssignment());
      }
    } catch (error) {
      console.error(error);
      toast.error('Invalid OTP');
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      await axios.post('/api/otp/send-otp', {
        userId: activeAssignment.userId.toString(),
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  if (activeAssignment && userLocation) {
    return (
      <div className="min-h-screen bg-gray-50 px-3 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-full max-w-xl space-y-4"
        >
          <h1 className="ml-1 text-lg font-semibold">Current Delivery</h1>
          <div className="border-border relative h-80 overflow-hidden rounded-2xl border bg-neutral-100 p-2">
            <LiveMapTracking
              userLocation={userLocation}
              deliveryBoyLocation={deliveryBoyLocation!}
            />
          </div>

          <div className="border-border flex items-center justify-between gap-3 rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="text-primary rounded-lg bg-neutral-200 p-2.5">
                <User size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {activeAssignment.address.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {activeAssignment.address.contact}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary rounded-lg bg-neutral-200 p-2.5">
                <a href={`tel:${activeAssignment.address.contact}`}>
                  <Phone size={20} />
                </a>
              </div>
              <button
                onClick={() => setShowChat((prev) => !prev)}
                className="text-primary cursor-pointer rounded-lg bg-neutral-200 p-2.5"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          {showChat && userData && (
            <ChatMessageBox
              orderId={activeAssignment._id!.toString()}
              currentUserId={userData._id!.toString()}
            />
          )}
          <div className="border-border mb-8 rounded-2xl border bg-white p-4">
            <div className="border-border mb-2.5 flex flex-col gap-4 border-b border-dashed pb-3 sm:flex-row">
              <div className="flex flex-row items-start gap-3 sm:items-center">
                <div className="text-primary rounded-lg bg-neutral-200 p-2.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold md:text-sm">
                    Delivery Address
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-[12px] text-gray-500">
                    {activeAssignment?.address?.fullAddress}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowConfirm(true)}
                whileTap={{
                  scale: [0.95, 1],
                }}
                transition={{
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 200,
                  damping: 12,
                }}
                className="bg-primary border-border rounded-lg border px-3 py-2 text-[13px] font-medium text-white sm:ml-auto"
              >
                Mark as Delivered
              </motion.button>
            </div>
            <p className="mb-3 text-[15px] font-semibold">Order Items</p>

            <div className="space-y-3 text-neutral-600">
              {activeAssignment.items.map((item: any) => (
                <div
                  key={item.foodId.toString()}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-border mt-4 flex justify-between border-t pt-3">
              <span className="text-sm font-semibold">Total</span>
              <span className="text-sm font-semibold">
                Rs. {activeAssignment.totalAmount}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {showConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="border-border relative w-[90%] max-w-sm rounded-2xl border bg-white p-5 shadow-lg"
                >
                  <p className="mb-4 text-center text-sm font-medium">
                    Are you sure you want to mark this order as delivered?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        handleMarkAsDelivered();
                        setShowConfirm(false);
                      }}
                      className="bg-primary flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-200"
                    >
                      No
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <OtpVerification
          visible={otpVisible}
          onClose={() => setOtpVisible(false)}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
        />
      </div>
    );
  }

  return (
    <div className="h-screen px-4 py-20">
      <div className="mx-auto max-w-xl space-y-4">
        <h1 className="ml-1 text-lg font-semibold">Available Deliveries</h1>

        {!activeAssignment && assignments.length === 0 && (
          <p className="ml-1 text-sm text-neutral-500">
            No delivery requests right now.
          </p>
        )}

        {assignments.map((assignment) => {
          const order = assignment.orderId as any;

          return (
            <motion.div
              key={assignment._id?.toString()}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="border-border rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Hash size={18} className="text-neutral-500" />
                <span className="text-sm font-medium text-neutral-800">
                  Order No: {order._id?.toString().slice(-6)}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
                <Wallet size={14} />
                Payment Method:{' '}
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}
              </div>

              <div className="mt-2 flex items-start gap-2.5 text-xs text-neutral-600">
                <MapPin className="mt-0.5 size-4 md:size-3.5" />
                {order.address.fullAddress}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    const id = assignment?._id?.toString();
                    if (id) handleAccept(id);
                  }}
                  className="bg-primary border-border flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-sm text-white hover:bg-orange-600"
                >
                  <CheckCircle size={16} />
                  Accept
                </button>

                <button className="border-border flex flex-1 items-center justify-center gap-1 rounded-lg border bg-red-100 py-2 text-sm text-red-600 transition-colors hover:bg-red-200">
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
