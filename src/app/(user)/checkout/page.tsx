'use client';

import dynamic from 'next/dynamic';
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

import { RootState } from '@/redux/store';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  CreditCard,
  Wallet,
  Search,
  Truck,
  LocateFixed,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function CheckoutPage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const { cartData } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const delivery = cartData.length * 50;
  const total = Math.round(subtotal - discount + delivery);

  const [address, setAddress] = useState({
    fullName: '',
    contact: '',
    fullAddress: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [position, setPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>(
    'stripe',
  );
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setAddress((prev) => ({
        ...prev,
        fullName: userData.username,
        contact: userData.contact?.toString() || '',
      }));
    }
  }, [userData]);

  function getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 5000 },
      );
    }
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    async function fetchAddressFromCoords(lat: number, lng: number) {
      try {
        const res = await axios.get(
          `/api/reverse-geocode?lat=${lat}&lon=${lng}`,
        );
        const data = res.data;
        if (data?.address) {
          setAddress((prev) => ({
            ...prev,
            fullAddress: data.display_name || '',
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              '',
            state: data.address.state || '',
            pincode: data.address.postcode || '',
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (position) fetchAddressFromCoords(position[0], position[1]);
  }, [position]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search-geocode?q=${searchQuery}`);
      const results = await res.json();
      if (results.length > 0) {
        setPosition([+results[0].lat, +results[0].lon]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  const handleCodPayment = async () => {
    if (!position) {
      alert('Please select your location on the map.');
      return;
    }

    setOrderLoading(true);
    try {
      const res = await axios.post('/api/user/order', {
        userId: userData?._id,
        items: cartData.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        paymentMethod,
        address: {
          ...address,
          latitude: position[0],
          longitude: position[1],
        },
      });

      router.push('/order-success');
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleOnlinePayment = async () => {
    if (!position) {
      alert('Please select your location on the map.');
      return;
    }

    setOrderLoading(true);
    try {
      const res = await axios.post('/api/user/payment', {
        userId: userData?._id,
        items: cartData.map((item) => ({
          foodId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        paymentMethod,
        address: {
          ...address,
          latitude: position[0],
          longitude: position[1],
        },
      });

      console.log(res.data);
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 pb-12 md:max-lg:px-36 lg:max-xl:px-20"
      >
        <div className="border-border sticky top-0 z-40 mx-auto mb-6 border-b bg-neutral-50/0 py-5 backdrop-blur-lg">
          <div className="flex items-center gap-18 sm:gap-8">
            <Link
              href="/home"
              className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft size={16} /> Back
            </Link>

            <h1 className="text-lg font-semibold">Your Cart</h1>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:max-xl:gap-4">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* ADDRESS */}
            <motion.div
              variants={itemVariants}
              className="border-border rounded-2xl border bg-white p-5"
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
                <MapPin size={18} /> Delivery Address
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                  <User size={16} className="text-neutral-500" />
                  <input
                    value={address.fullName}
                    placeholder="Full Name"
                    className="w-full outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, fullName: e.target.value }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                  <Phone size={16} className="text-neutral-500" />
                  <input
                    value={address.contact}
                    placeholder="Phone Number"
                    className="w-full outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, contact: e.target.value }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                  <MapPin size={16} className="text-neutral-500" />
                  <input
                    value={address.fullAddress}
                    placeholder="Full Address"
                    className="w-full outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({
                        ...p,
                        fullAddress: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <input
                    value={address.city}
                    placeholder="City"
                    className="rounded-xl border border-neutral-400 px-4 py-2.5 text-sm outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, city: e.target.value }))
                    }
                  />
                  <input
                    value={address.state}
                    placeholder="State"
                    className="rounded-xl border border-neutral-400 px-4 py-2.5 text-sm outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, state: e.target.value }))
                    }
                  />
                  <input
                    value={address.pincode}
                    placeholder="Pincode"
                    className="rounded-xl border border-neutral-400 px-4 py-2.5 text-sm outline-none"
                    onChange={(e) =>
                      setAddress((p) => ({ ...p, pincode: e.target.value }))
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                    <Search size={16} className="text-neutral-500" />
                    <input
                      value={searchQuery}
                      placeholder="Search city or area..."
                      className="w-full outline-none"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-primary flex w-24 items-center justify-center rounded-xl text-sm font-medium text-white"
                  >
                    {loading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* MAP */}
            <motion.div
              variants={itemVariants}
              className="border-border relative h-80 overflow-hidden rounded-2xl border bg-neutral-100 p-2"
            >
              {position && (
                <MapView position={position} setPosition={setPosition} />
              )}
              <button
                onClick={getCurrentLocation}
                className="absolute right-2 bottom-6 z-50 rounded-full bg-white p-2"
              >
                <LocateFixed className="size-5 text-red-500" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            variants={itemVariants}
            className="border-border h-fit rounded-2xl border bg-white p-5 sm:p-6 lg:sticky lg:top-20"
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
              Payment Method
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium ${
                  paymentMethod === 'stripe'
                    ? 'border-neutral-500 bg-zinc-200'
                    : 'border-neutral-400'
                }`}
              >
                <CreditCard size={18} /> Pay Online (Stripe)
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium ${
                  paymentMethod === 'cod'
                    ? 'border-neutral-500 bg-zinc-200'
                    : 'border-neutral-400'
                }`}
              >
                <Wallet size={18} /> Cash on Delivery
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Discount (-10%)</span>
                <span className="font-medium text-red-500">
                  - Rs. {discount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Fee</span>
                <span className="font-medium">Rs. {delivery}</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-primary mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 font-medium text-white"
              onClick={() =>
                paymentMethod === 'cod'
                  ? handleCodPayment()
                  : handleOnlinePayment()
              }
            >
              {orderLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <Truck className="size-5" /> Place Order
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
