import UserNav from '@/components/user/UserNav';
import Hero from '@/components/user/Hero';

export default async function page() {
  return (
    <>
      <UserNav />
      <div className="relative mt-20 h-screen w-full px-4 md:mt-23 md:px-11.75 lg:px-15.5 xl:px-23">
        <Hero />
      </div>
    </>
  );
}
