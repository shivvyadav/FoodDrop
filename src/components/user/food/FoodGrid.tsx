'use client';
import { useSelector } from 'react-redux';
import FoodCard, { Food } from './FoodCard';

const FoodGrid = () => {
  const { foodData } = useSelector((state: any) => state.food);
  const foods: Food[] = foodData;
  if (!foods.length) {
    return (
      <p className="text-center text-neutral-500">No food items available</p>
    );
  }

  return (
    <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {foods.map((food) => (
        <FoodCard key={food._id.toString()} food={food} />
      ))}
    </div>
  );
};

export default FoodGrid;
