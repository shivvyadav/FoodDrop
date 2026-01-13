'use client';

import dynamic from 'next/dynamic';
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
});
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
import axios from 'axios';

export default function CheckoutPage() {
  const { userData } = useSelector((state: RootState) => state.user);
  const { cartData } = useSelector((state: RootState) => state.cart);

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
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
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
        if (data && data.address) {
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
        console.error('Reverse geocoding failed:', err);
      }
    }
    if (position) {
      fetchAddressFromCoords(position[0], position[1]);
    }
  }, [position]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search-geocode?q=${searchQuery}`);
      const results = await res.json();
      if (results.length > 0) {
        setPosition([+results[0].lat, +results[0].lon]);
      }
    } catch (error) {
      console.error('Geocoding failed:', error);
    } finally {
      setLoading(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-12 md:max-lg:px-36 lg:max-xl:px-20">
        {/* HEADER */}
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
          >
            <ArrowLeft size={16} /> Back to Cart
          </Link>
        </div>

        <h1 className="mb-4 text-xl font-semibold text-neutral-800">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3 lg:max-xl:gap-4">
          {/* left section */}
          <div className="space-y-6 lg:col-span-2">
            {/* delivery address */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-border rounded-2xl border bg-white p-5"
            >
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-800">
                <MapPin size={18} /> Delivery Address
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                  <User size={16} className="text-neutral-500" />
                  <input
                    placeholder="Full Name"
                    className="w-full outline-none"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-neutral-400 px-4 py-2.5 text-sm">
                  <Phone size={16} className="text-neutral-500" />
                  <input
                    placeholder="Phone Number"
                    className="w-full outline-none"
                    value={address.contact}
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        contact: e.target.value,
                      }))
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
                      setAddress((prev) => ({
                        ...prev,
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
                      setAddress((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                  <input
                    value={address.state}
                    placeholder="State"
                    className="rounded-xl border border-neutral-400 px-4 py-2.5 text-sm outline-none"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  />
                  <input
                    value={address.pincode}
                    placeholder="Pincode"
                    className="rounded-xl border border-neutral-400 px-4 py-2.5 text-sm outline-none"
                    onChange={(e) =>
                      setAddress((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
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

            {/* map */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-border h-80 overflow-hidden rounded-2xl border bg-neutral-100 p-2"
            >
              {/* Replace with Leaflet / Google Maps */}
              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-lg text-sm text-neutral-600">
                {position && (
                  <MapView position={position} setPosition={setPosition} />
                )}
                <button
                  onClick={() => getCurrentLocation()}
                  className="absolute right-0 bottom-4 z-50 rounded-full bg-white p-2 shadow-md hover:shadow-lg"
                >
                  <LocateFixed className="size-5 text-red-500" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* right section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-border h-fit rounded-2xl border bg-white p-5 sm:p-6 lg:sticky lg:top-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-800">
              Payment Method
            </h2>

            <div className="space-y-3 text-neutral-800">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`flex w-full items-center gap-3 ${paymentMethod === 'stripe' ? 'border-neutral-500 bg-neutral-100' : ''} rounded-xl border border-neutral-400 px-4 py-2.5 text-sm font-medium hover:border-neutral-500`}
              >
                <CreditCard size={18} />
                Pay Online (Stripe)
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`flex w-full items-center gap-3 rounded-xl ${paymentMethod === 'cod' ? 'border-neutral-500 bg-neutral-100' : ''} border border-neutral-400 px-4 py-2.5 text-sm font-medium hover:border-neutral-500`}
              >
                <Wallet size={18} />
                Cash on Delivery
              </button>
            </div>

            {/* summary */}
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium text-neutral-800">
                  Rs. {subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Discount (-10%)</span>
                <span className="font-medium text-red-500">
                  - Rs. {discount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Fee</span>
                <span className="font-medium text-neutral-800">
                  Rs. {delivery}
                </span>
              </div>

              <div className="flex justify-between border-t border-neutral-500 pt-3 text-base font-semibold text-neutral-800">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="bg-primary mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 font-medium text-white"
            >
              <Truck className="size-5" />
              Place Order
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
