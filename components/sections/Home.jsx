'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Button from '@/components/common/Button';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  const handleScroll = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="gradient-text-primary">{portfolioData.headline}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {portfolioData.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-stretch max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleScroll('#projects')}
              className="w-full flex items-center justify-center gap-2 whitespace-nowrap"
            >
              View My Work <ArrowRight size={20} />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = portfolioData.resume.url;
                link.download = 'Arnav_Gupta_Resume.pdf';
                link.click();
              }}
              className="w-full flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Download size={20} /> {portfolioData.resume.label}
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="mt-16 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-gray-500 text-sm">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-neon-cyan/50 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-2 bg-neon-cyan rounded-full mt-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
