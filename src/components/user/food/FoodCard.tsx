'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import mongoose from 'mongoose';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from '@/redux/slices/cartSlice';

export type Food = {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  image: string;
  price: number;
  category: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type Props = {
  food: Food;
};

const FoodCard = ({ food }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartData);
  const cartItem = cartItems.find((item) => item._id === food._id);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm transition hover:shadow-md">
      <span
        className={`absolute top-2 left-2 rounded-full ${food?.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'} px-2 py-0.5 text-xs text-white backdrop-blur-md`}
      >
        {food?.type || ''}
      </span>

      <div className="relative h-30 w-full rounded-lg md:h-36 xl:h-44">
        <Image
          src={food?.image}
          alt={food?.name}
          fill
          sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-102"
        />
      </div>

      <div className="flex flex-col p-1">
        <p className="mt-1 text-xs text-neutral-400">{food.category}</p>
        <div className="my-3 flex justify-between text-sm md:text-lg">
          <span className="font-semibold text-neutral-800">{food.name}</span>
          <span className="font-bold text-neutral-900">Rs. {food?.price}</span>
        </div>

        {!cartItem ? (
          <button
            onClick={() => dispatch(addToCart({ ...food, quantity: 1 }))}
            className="flex items-center justify-center rounded-lg bg-amber-400 py-2 text-sm font-medium text-black transition hover:bg-amber-500 md:px-4"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full bg-neutral-100 px-2 py-1.5">
            <button
              onClick={() => dispatch(decreaseQuantity(food._id.toString()))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold shadow"
            >
              −
            </button>

            <span className="text-sm font-semibold">{cartItem.quantity}</span>

            <button
              onClick={() => dispatch(increaseQuantity(food._id.toString()))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold shadow"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
