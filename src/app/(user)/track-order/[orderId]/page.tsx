'use client';
import LiveMapTracking from '@/components/LiveMapTracking';
import { connectWS } from '@/lib/socket';
import ChatMessageBox from '@/components/ChatMessageBox';
import { IUser } from '@/models/User';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { ArrowLeft, Bike, MapPin, MessageCircle, Phone } from 'lucide-react';
import mongoose from 'mongoose';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  items: [
    {
      foodId: mongoose.Types.ObjectId;
      name: string;
      image: string;
      quantity: number;
      price: number;
    },
  ];
  totalAmount: number;
  paymentMethod: 'stripe' | 'cod';
  isPaid: boolean;
  address: {
    fullName: string;
    contact: number;
    fullAddress: string;
    city: string;
    state: string;
    pincode?: string;
    latitude: number;
    longitude: number;
  };
  assignment?: mongoose.Types.ObjectId | null;
  assignedDeliveryBoy?: IUser | null;
  status: 'pending' | 'out for delivery' | 'delivered';
  createdAt?: Date;
  updatedAt?: Date;
}

export default function TrackOrder({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = useParams();
  const { userData } = useSelector((state: RootState) => state.user);
  const [order, setOrder] = useState<IOrder | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState<
    [number, number]
  >([0, 0]);

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/user/track-order/${orderId}`);
        console.log(res.data);
        setOrder(res.data.order);
        setUserLocation([
          res.data.order?.address.latitude,
          res.data.order?.address.longitude,
        ]);
        const [lng, lat] =
          res.data.order.assignedDeliveryBoy.location.coordinates;

        setDeliveryBoyLocation([lat, lng]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [userData?._id]);

  useEffect(() => {
    const socket = connectWS();
    socket.on('update-deliveryBoy-location', ({ userId, lat, long }) => {
      setDeliveryBoyLocation([lat, long]);
    });
  });

  return (
    <div className="min-h-screen bg-gray-50 px-3 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mx-auto w-full max-w-2xl"
      >
        {/* Header */}
        <div className="border-border sticky top-0 z-40 mb-6 border-b bg-neutral-50 py-5">
          <div className="flex items-center gap-18 sm:gap-8">
            <Link
              href="/my-orders"
              className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft size={16} /> Back
            </Link>
            <h1 className="text-lg font-semibold">Track Order</h1>
          </div>
        </div>

        {/* Map */}
        {order && userLocation[0] !== 0 && (
          <div className="border-border relative h-88 overflow-hidden rounded-2xl border bg-neutral-100 p-2">
            <LiveMapTracking
              userLocation={userLocation}
              deliveryBoyLocation={deliveryBoyLocation}
            />
          </div>
        )}

        {order && userData && (
          <div className="mt-4 space-y-4">
            {/* Delivery Person */}
            {order.assignedDeliveryBoy && (
              <div className="border-border flex items-center justify-between gap-3 rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-200">
                    {order.assignedDeliveryBoy?.image ? (
                      <Image
                        src={order.assignedDeliveryBoy.image}
                        alt={order.assignedDeliveryBoy.username}
                        className="h-full w-full rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-lg font-semibold">
                        {order.assignedDeliveryBoy.username.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {order.assignedDeliveryBoy.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {order.assignedDeliveryBoy.contact}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-primary rounded-lg bg-neutral-200 p-2.5">
                    <a href={`tel:${order?.assignedDeliveryBoy?.contact}`}>
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
            )}

            {showChat && order && userData && order.assignedDeliveryBoy && (
              <ChatMessageBox
                orderId={order?._id?.toString()!}
                currentUserId={userData?._id?.toString()!}
              />
            )}

            {/* Order Items */}
            <div className="border-border mb-8 rounded-2xl border bg-white p-4">
              <div className="border-border mb-2.5 flex items-center gap-4 border-b border-dashed pb-3">
                <div className="text-primary rounded-lg bg-neutral-200 p-2.5">
                  <Bike size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">On the way</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={14} /> {order?.address?.fullAddress}
                  </p>
                </div>
              </div>
              <p className="mb-3 text-[15px] font-semibold">Order Items</p>

              <div className="space-y-3 text-neutral-600">
                {order.items.map((item) => (
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
                  Rs. {order.totalAmount}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
