'use client';

import { motion } from 'framer-motion';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variants = {
    default:
      'bg-gray-100 border border-gray-200 text-gray-700 dark:bg-white/5 dark:border-white/10 dark:text-gray-300',
    primary:
      'bg-blue-50 border border-blue-200 text-blue-600 dark:bg-neon-cyan/10 dark:border-neon-cyan/50 dark:text-neon-cyan',
    secondary:
      'bg-blue-50 border border-blue-200 text-blue-600 dark:bg-neon-blue/10 dark:border-neon-blue/50 dark:text-neon-blue',
    success:
      'bg-green-50 border border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/50 dark:text-green-400',
  };

  return (
    <motion.span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
    </motion.span>
  );
}
