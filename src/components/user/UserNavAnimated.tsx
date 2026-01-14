'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const navVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut' as const,
    },
  },
};

export default function UserNavAnimated({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={navVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
