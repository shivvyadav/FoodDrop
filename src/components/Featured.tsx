import Image from 'next/image';
import delivery from '@/assets/delivery.png';
import lifestyle from '@/assets/lifestyle.png';
import manifest from '@/assets/manifest.png';
import vegan from '@/assets/vegan.png';

const featuresLeft = [
  { title: 'Healthy', icon: '/icons/healthy.png', image: lifestyle },
  { title: 'Veg Mode', icon: '/icons/veg.png', image: vegan },
  { title: 'Delivery Jobs', icon: '/icons/party.png', image: delivery },
  { title: 'Easy to Order', icon: '/icons/gift.png', image: manifest },
];
export default function FeaturesShowcase() {
  return (
    <section className="px-8 md:py-16">
      <div className="mb-14 text-center">
        <h2 className="font-logo text-primary text-2xl font-black md:text-4xl">
          What do we have for you
          <br />
          on our website
        </h2>
        <p className="mt-3 text-neutral-500">
          Designed to make food ordering simpler, faster, and healthier
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuresLeft.map((feature) => (
          <div
            key={feature.title}
            className="group relative flex flex-col items-center rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="group-hover:bg-primary/10 mb-6 flex size-24 items-center justify-center rounded-full bg-neutral-100 transition-colors duration-300">
              <Image
                src={feature.image}
                alt={feature.title}
                width={64}
                height={64}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="text-base font-semibold text-neutral-800 md:text-lg">
              {feature.title}
            </h3>

            <span className="group-hover:ring-primary/30 pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition" />
          </div>
        ))}
      </div>
    </section>
  );
}
