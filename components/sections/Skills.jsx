'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { skillsData } from '@/data/skills';

export default function Skills() {
  const [ref, isInView] = useInView();
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <section id="skills" className=" bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
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
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg">
            Expertise across AI/ML, Cloud, and Full-Stack Development
          </p>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillsData.categories.map((category, idx) => (
            <SkillCategory
              key={idx}
              category={category}
              isExpanded={expandedCategory === idx}
              onToggle={() =>
                setExpandedCategory(expandedCategory === idx ? null : idx)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategory({ category, isExpanded, onToggle }) {
  return (
    <motion.div variants={staggerItem}>
      <Card
        className="p-6 cursor-pointer"
        hover
        onClick={onToggle}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-neon-cyan"
          >
            ▼
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-4">
            {category.skills.map((skill, idx) => (
              <SkillItem key={idx} skill={skill} delay={idx * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Preview (always visible) */}
        {!isExpanded && (
          <div className="flex flex-wrap gap-2">
            {category.skills.slice(0, 3).map((skill, idx) => (
              <Badge key={idx} variant="primary">
                {skill.icon} {skill.name}
              </Badge>
            ))}
            {category.skills.length > 3 ? (
              <Badge variant="default">+{category.skills.length - 3} more</Badge>
            ) : null}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function SkillItem({ skill, delay }) {
  const levelColors = {
    Expert: 'text-neon-cyan',
    Advanced: 'text-neon-blue',
    Intermediate: 'text-neon-purple',
    Beginner: 'text-gray-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-blue-500/50 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:border-neon-cyan/50"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{skill.icon}</span>
        <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
      </div>
      <p className={`text-xs font-medium ${levelColors[skill.level]}`}>
        {skill.level}
      </p>
    </motion.div>
  );
}
