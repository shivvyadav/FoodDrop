'use client';

import { RootState } from '@/redux/store';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
  clearCart,
} from '@/redux/slices/cartSlice';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

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

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state: RootState) => state.cart);

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = subtotal * 0.1;
  const delivery = cartData.length * 50;
  const total = Math.round(subtotal - discount + delivery);

  useEffect(() => {}, [cartData]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl px-4 md:max-lg:px-36 lg:max-xl:px-20"
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

        {cartData.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="h-[50vh] rounded-2xl pt-8 text-center"
          >
            <p className="text-lg font-medium text-neutral-700">
              Your cart is empty
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Add some items to get started
            </p>
          </motion.div>
        )}
        {cartData.length > 0 && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <AnimatePresence>
                {cartData.map((item) => (
                  <motion.div
                    key={item._id.toString()}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-medium text-neutral-700">
                          {item.name}
                        </p>
                        <p className="my-1 text-xs text-neutral-500">
                          {item.type}
                        </p>
                        <p className="font-semibold text-neutral-800">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-2 py-1.5">
                        <button
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id.toString()))
                          }
                          className="flex size-8 items-center justify-center rounded-full bg-white shadow"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(increaseQuantity(item._id.toString()))
                          }
                          className="flex size-8 items-center justify-center rounded-full bg-white shadow"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(deleteFromCart(item._id.toString()))
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SUMMARY */}
            <motion.div
              variants={itemVariants}
              className="border-border h-fit rounded-2xl border bg-white p-5 sm:p-6 lg:sticky lg:top-6"
            >
              <h2 className="text-lg font-semibold">Order Summary</h2>

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
                onClick={() => router.push('/checkout')}
                className="bg-primary mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 font-medium text-white hover:bg-orange-600"
              >
                Go to Checkout <ArrowRight size={16} />
              </motion.button>

              <button
                onClick={() => dispatch(clearCart())}
                className="mt-3 w-full text-center text-sm font-medium text-red-500 hover:text-red-600"
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
