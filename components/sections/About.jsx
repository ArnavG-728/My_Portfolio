'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView, useCounter } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/common/Card';
import { portfolioData } from '@/data/portfolio';

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section id="about" className=" bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="section-container" ref={ref}>
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Bio */}
          <motion.div variants={staggerItem}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text-primary"
              {...scrollReveal}
            >
              About Me
            </motion.h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {portfolioData.about.bio.split('\n\n').map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  className="text-lg"
                  variants={staggerItem}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: Profile Photo + Stats */}
          <motion.div
            className="flex flex-col gap-8"
            variants={staggerContainer}
          >
            {/* Profile Photo with Circular Frame & Gradient Blur */}
            <motion.div
              className="flex justify-center items-center"
              variants={staggerItem}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                {/* Gradient blur background effect */}
                <motion.div
                  className="absolute -inset-1.5 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />

                {/* Profile Image - Circular */}
                <Image
                  src={portfolioData.about.profilePhoto}
                  alt={portfolioData.name}
                  width={400}
                  height={400}
                  className="rounded-full relative object-cover border-4 border-white dark:border-dark-950 w-full h-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {portfolioData.about.stats.map((stat, idx) => (
                <StatCard key={idx} stat={stat} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ stat, isInView }) {
  const [count, setIsActive] = useCounter(
    parseInt(stat.label.replace(/[^0-9]/g, '')),
    2000
  );

  React.useEffect(() => {
    if (isInView) {
      setIsActive(true);
    }
  }, [isInView, setIsActive]);

  return (
    <Card className="p-6 text-center" hover>
      <motion.div
        className="text-4xl font-bold gradient-text-primary mb-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      >
        {count}
        {stat.label.includes('%') ? '%' : stat.label.includes('+') ? '+' : ''}
      </motion.div>
      <p className="text-gray-400 text-sm">{stat.value}</p>
    </Card>
  );
}

import React from 'react';
