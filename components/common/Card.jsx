'use client';

import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = true,
  ...props
}) {
  const variants = {
    default: 'glass-card',
    hover: 'glass-card-hover',
  };

  const cardVariant = hover ? 'hover' : variant;

  return (
    <motion.div
      className={`${variants[cardVariant]} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
