'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader } from 'lucide-react';
import { useInView } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { portfolioData } from '@/data/portfolio';

export default function Contact() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className=" bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="section-container" ref={ref}>
        <motion.div
          className="max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Heading */}
          <motion.div className="text-center mb-12" variants={staggerItem}>
            <h2 className="text-4xl md:text-5xl font-bold p-4 gradient-text-primary">
              {portfolioData.contact.heading}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {portfolioData.contact.description}
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={staggerItem}>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:focus:border-neon-cyan/50 dark:focus:ring-neon-cyan/30"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:focus:border-neon-cyan/50 dark:focus:ring-neon-cyan/30"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300 resize-none dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-gray-500 dark:focus:border-neon-cyan/50 dark:focus:ring-neon-cyan/30"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ Error sending message. Please try again.
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={20} />
                      {portfolioData.contact.cta}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Direct Contact Info */}
          <motion.div
            className="mt-12 text-center"
            variants={staggerItem}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">Or reach out directly:</p>
            <motion.a
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300 text-lg font-semibold"
              whileHover={{ x: 5 }}
            >
              <Mail size={20} />
              {portfolioData.email}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
