import Image from 'next/image';
import fooddroplogo from '@/assets/fooddroplogo.png';

export default function Logo() {
  return (
    <div className="font-logo text-primary relative cursor-default text-xl">
      <span className="absolute -top-2 right-8 rotate-60 text-7xl text-orange-400">
        /
      </span>
      FoodDrop
    </div>
  );
}
