'use client';
import { IconSearch } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchComponent() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    router.replace(query ? `/home?q=${encodeURIComponent(query)}` : '/home');
    setOpen(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div ref={wrapperRef} className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="lg:hidden"
      >
        <IconSearch className="size-6 text-neutral-300" />
      </button>

      <div className="hidden lg:block">
        <form className="relative" onSubmit={onSubmit}>
          <IconSearch className="absolute top-2 right-3 size-5 text-neutral-400" />
          <input
            type="text"
            placeholder="search for food"
            className="focus:ring-border w-80 rounded-full bg-neutral-50 px-4 py-1.5 pl-4 placeholder:text-sm focus:ring-1 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <AnimatePresence>
        {open && (
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-12 -left-17 z-20 sm:left-8 lg:hidden"
          >
            <input
              autoFocus
              type="text"
              placeholder="search"
              className="focus:ring-border border-border w-72 rounded-full border bg-zinc-100 px-4 py-1 pl-4 placeholder:text-sm focus:ring-1 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
