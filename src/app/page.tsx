import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function page() {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
      <div className="relative w-full">
        <Footer />
      </div>
    </div>
  );
}
