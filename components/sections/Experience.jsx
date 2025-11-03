'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { experienceData } from '@/data/experience';

export default function Experience() {
  const [ref, isInView] = useInView();

  return (
    <section id="experience" className=" bg-white dark:bg-dark-950 relative overflow-hidden scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0] }}
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
            Experience
          </h2>
          <p className="text-gray-400 text-lg">
            My journey of growth and impact in AI/ML engineering
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {experienceData.map((exp, idx) => (
            <ExperienceCard key={exp.id} experience={exp} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience, index }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <motion.div variants={staggerItem}>
      <Card
        className="p-6 cursor-pointer"
        hover
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {experience.role}
            </h3>
            <p className="text-neon-cyan font-medium">{experience.company}</p>
          </div>
          <Badge variant="secondary">{experience.duration}</Badge>
        </div>

        <p className="text-gray-400 mb-4">{experience.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {experience.highlights.map((highlight, idx) => (
            <Badge key={idx} variant="primary">
              {highlight}
            </Badge>
          ))}
        </div>

        {/* Expandable Achievements */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-2">
            {experience.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="flex gap-3 text-gray-600 dark:text-gray-300"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-neon-cyan mt-1">▸</span>
                <p>{achievement}</p>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <Badge key={idx} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Expand Indicator */}
        <motion.div
          className="mt-4 text-neon-cyan text-sm font-medium"
          animate={{ rotate: expanded ? 180 : 0 }}
        >
          {expanded ? '▲ Show less' : '▼ Show more'}
        </motion.div>
      </Card>
    </motion.div>
  );
}

import React from 'react';
