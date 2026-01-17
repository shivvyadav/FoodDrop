'use client';
import { motion, MotionConfig } from 'motion/react';

type propType = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function AnimatedHamburgerButton({
  active,
  setActive,
}: propType) {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive((pv) => !pv)}
        className="relative top-2 z-50 h-14 w-12 rounded-full transition-colors"
      >
        <motion.span
          variants={VARIANTS.top}
          className="bg-primary absolute h-1 w-7 rounded"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="bg-primary absolute h-1 w-7 rounded"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="bg-primary absolute h-1 w-7 rounded"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: '50%',
          }}
        />
      </motion.button>
    </MotionConfig>
  );
}

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: '50%',
    },
  },
};
