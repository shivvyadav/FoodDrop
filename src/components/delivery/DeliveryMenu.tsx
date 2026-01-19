'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    name: 'dashboard',
    href: '/delivery/dashboard',
  },
  {
    name: 'orders',
    href: '/delivery/orders',
  },
];

export default function DeliveryMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition ${
              isActive
                ? 'border-primary border-b-2 text-neutral-800 hover:text-gray-900'
                : 'border-b-2 border-transparent text-neutral-600 hover:text-gray-900'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
