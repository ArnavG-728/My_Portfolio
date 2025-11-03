'use client';

import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';
import { useInView } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { achievementsData } from '@/data/achievements';

export default function Achievements() {
  const [ref, isInView] = useInView();

  return (
    <section id="achievements" className="py-20 bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Achievements & Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Recognition of expertise and continuous learning
          </p>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            variants={staggerItem}
          >
            🏆 Awards
          </motion.h3>
          <motion.div className="space-y-4" variants={staggerContainer}>
            {achievementsData.awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            variants={staggerItem}
          >
            📜 Certifications
          </motion.h3>

          {/* Group by Category */}
          {['Cloud & Platform', 'Technical Skills', 'Data Science'].map(
            (category) => {
              const certs = achievementsData.certifications.filter(
                (c) => c.category === category
              );
              if (certs.length === 0) return null;

              return (
                <motion.div key={category} className="mb-8" variants={staggerItem}>
                  <h4 className="text-lg font-semibold text-neon-cyan mb-4">
                    {category}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {certs.map((cert) => (
                      <CertificationCard key={cert.id} cert={cert} />
                    ))}
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>
    </section>
  );
}

function AwardCard({ award }) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="p-8 border-l-4 border-neon-cyan" hover>
        <div className="flex items-start gap-4">
          <motion.div
            className="text-5xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {award.icon}
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{award.title}</h4>
              <Badge variant="primary">{award.position}</Badge>
            </div>
            <p className="text-neon-cyan font-semibold mb-2">
              Prize: {award.prize}
            </p>
            <p className="text-gray-400 mb-2">{award.description}</p>
            <p className="text-sm text-gray-500">
              {award.competitiveContext} • {award.date}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function CertificationCard({ cert }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Card className="p-6 h-full" hover>
        <div className="flex items-start gap-3 mb-3">
          <Award size={20} className="text-neon-cyan flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{cert.title}</h4>
            <p className="text-sm text-neon-cyan">{cert.issuer}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-3">{cert.date}</p>
        <div className="flex flex-wrap gap-2">
          {cert.skills.map((skill, idx) => (
            <Badge key={idx} variant="default">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
