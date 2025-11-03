'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from '@/utils/hooks';
import { scrollReveal, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import { projectsData } from '@/data/projects';

export default function Projects() {
  const [ref, isInView] = useInView();

  return (
    <section id="projects" className="bg-white dark:bg-dark-950 relative overflow-hidden transition-colors duration-300 scroll-mt-28 md:scroll-mt-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl">
            Showcase of production-grade AI/ML solutions that deliver measurable impact
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="p-8 h-full flex flex-col" hover>
        {/* Header */}
        <div className="mb-4">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            whileHover={{ color: '#00d9ff' }}
          >
            {project.title}
          </motion.h3>
          <p className="text-neon-cyan text-sm font-medium">{project.company}</p>
        </div>

        {/* Problem Statement */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic">
          &quot;{project.problem}&quot;
        </p>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">{project.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y border-gray-200 dark:border-white/10">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg font-bold gradient-text-primary">
                {metric.label}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <Badge key={idx} variant="primary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-300 font-semibold"
          whileHover={{ x: 5 }}
        >
          View Project <ExternalLink size={16} />
        </motion.a>
      </Card>
    </motion.div>
  );
}
