import { motion } from 'framer-motion';

export default function RightSvg() {
  return (
    <svg
      width="320"
      height="580"
      viewBox="0 0 320 580"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute hidden lg:top-18 lg:-right-24 lg:flex xl:top-24 xl:right-0"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        d="M321 61L319.999 60.7735C282.744 51.8866 246.677 36.783 210.686 22.6983C194.909 16.5244 179.318 10.9908 163.175 5.79981C122 -6.50002 61.6703 5.93255 27.0896 43.4815C7.82268 64.072 -0.356471 95.9396 1.16181 124.288C5.02453 196.37 55.7461 268.04 101.401 318.114C141.224 361.796 174.928 392.046 186 441.5C191.495 472.526 177.331 508.44 175 514C172.669 519.56 163.158 542.455 146 559.5C128.842 576.545 105.494 588.107 98 566.5C90.5063 544.893 130 489.5 130 489.5C130 489.5 158.396 451.847 173 442C213.953 404.509 267.116 389.823 319.999 391.578L325 390.5"
        stroke="oklch(89.2% 0.058 10.001)"
        strokeWidth="1"
      />
    </svg>
  );
}
