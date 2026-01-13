'use client';

import { RootState } from '@/redux/store';
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from '@/redux/slices/cartSlice';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-12 md:max-lg:px-36 lg:max-xl:px-20">
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/home"
            className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
        <h1 className="mb-4 text-xl font-semibold">Your Cart</h1>

        {/* EMPTY STATE */}
        {cartData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-[50vh] flex-col items-center justify-center rounded-2xl bg-white text-center shadow-sm"
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
            {/* CART ITEMS */}
            <div className="space-y-4 lg:col-span-2">
              <AnimatePresence>
                {cartData.map((item) => (
                  <motion.div
                    key={item._id.toString()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="h-20 w-20 rounded-xl object-cover transition-transform duration-300 hover:scale-102"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-700">
                          {item.name}
                        </p>
                        <p className="my-1 text-xs text-neutral-500">
                          {item.type}
                        </p>
                        <p className="mt-1 font-semibold text-neutral-800">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-border h-fit rounded-2xl border bg-white p-5 sm:p-6 lg:sticky lg:top-6"
            >
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-4 space-y-3 rounded-lg text-sm">
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
                onClick={() => router.push('/checkout')}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 400 }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 font-medium text-white"
              >
                Go to Checkout <ArrowRight size={16} />
              </motion.button>
              <button
                onClick={() =>
                  cartData.forEach((item) =>
                    dispatch(deleteFromCart(item._id.toString())),
                  )
                }
                className="mt-3 w-full text-center text-sm font-medium text-red-500 hover:text-red-600"
              >
                Clear Cart
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
