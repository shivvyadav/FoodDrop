'use client';

import useGetFoods from './hooks/useGetFoods';
export default function InitAllFoods() {
  useGetFoods();

  return null;
}
