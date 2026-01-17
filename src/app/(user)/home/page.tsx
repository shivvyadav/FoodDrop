import UserNav from '@/components/user/UserNav';
import Hero from '@/components/user/Hero';
import CategorySlider from '@/components/user/CategorySlider';
import FoodGrid from '@/components/user/food/FoodGrid';

export default async function page() {
  return (
    <>
      <UserNav />
      <div className="relative mt-20 w-full px-4 md:mt-23 md:px-11.75 lg:px-15.5 xl:px-23">
        <Hero />
      </div>
      <div className="mx-auto px-6 md:px-16 lg:px-24 xl:px-32">
        <CategorySlider />

        <h2 className="my-4 text-xl font-semibold text-neutral-800 lg:my-7">
          Best Selling Foods
        </h2>
        <FoodGrid />
      </div>
    </>
  );
}
