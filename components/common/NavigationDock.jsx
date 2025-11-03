'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code, Award, Mail, Github, Linkedin, FileText, Sun, Moon, Clock ,Code2, Star } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { useTheme } from '@/context/ThemeContext';
import { useActiveSection } from '@/utils/hooks';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Experience', href: '#experience', icon: Clock },
  { name: 'Skills', href: '#skills', icon: Code2 },
  { name: 'Achievements', href: '#achievements', icon: Award },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const socialLinks = [
  { name: 'GitHub', url: portfolioData.socials.github, icon: Github },
  { name: 'LinkedIn', url: portfolioData.socials.linkedin, icon: Linkedin },
];

const NavigationDock = () => {
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
  const activeSectionId = useActiveSection(sectionIds) || 'home';
  const [forcedId, setForcedId] = useState(null);
  const clearTimerRef = useRef(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    try { history.replaceState(null, '', href); } catch {}
    setForcedId(id);
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => setForcedId(null), 1200);
  };

  // Clear forced id once the observer reports the same section
  useEffect(() => {
    if (forcedId && activeSectionId === forcedId) {
      setForcedId(null);
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
        clearTimerRef.current = null;
      }
    }
  }, [activeSectionId, forcedId]);

  const effectiveActiveId = forcedId || activeSectionId || 'home';

  // Force "home" when at absolute top of the page
  useEffect(() => {
    const onScrollTopCheck = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY <= 1) {
          setForcedId('home');
        } else if (forcedId === 'home') {
          setForcedId(null);
        }
      }
    };
    window.addEventListener('scroll', onScrollTopCheck, { passive: true });
    onScrollTopCheck();
    return () => window.removeEventListener('scroll', onScrollTopCheck);
  }, [forcedId]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 hidden md:block" role="navigation" aria-label="Primary Navigation">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.5 }}
        className={`flex items-center gap-4 p-2 rounded-full backdrop-blur-lg shadow-2xl transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-black/40 border border-white/10'
            : 'bg-white/40 border border-gray-200/50'
        }`}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {navLinks.map((link) => {
          const isActive = effectiveActiveId === link.href.replace('#', '');
          const isHovered = hoveredItem === link.name;
          const shouldShowText = isActive || isHovered;

          return (
            <Link
              href={link.href}
              key={link.name}
              onMouseEnter={() => setHoveredItem(link.name)}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/20 text-blue-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
              } ${!shouldShowText && 'w-10 justify-center'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              <motion.span
                initial={{ width: 0, opacity: 0, x: -10 }}
                animate={{
                  width: shouldShowText ? 'auto' : 0,
                  opacity: shouldShowText ? 1 : 0,
                  x: shouldShowText ? 0 : -10,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium"
              >
                {link.name}
              </motion.span>
            </Link>
          );
        })}

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-neon-cyan/50 to-transparent mx-2" />

        {socialLinks.map((social) => {
          const isHoveredSocial = hoveredItem === social.name;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredItem(social.name)}
              className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
                isHoveredSocial 
                  ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/20 text-blue-600'
                  : theme === 'dark' ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
              } ${!isHoveredSocial && 'w-10 justify-center'}`}
              title={social.name}
            >
              <social.icon className="w-5 h-5 shrink-0" />
              <motion.span
                initial={{ width: 0, opacity: 0, x: -10 }}
                animate={{
                  width: isHoveredSocial ? 'auto' : 0,
                  opacity: isHoveredSocial ? 1 : 0,
                  x: isHoveredSocial ? 0 : -10,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium"
              >
                {social.name}
              </motion.span>
            </a>
          );
        })}

        <div className={`h-6 w-px bg-gradient-to-b transition-colors duration-300 mx-2 ${
          theme === 'dark'
            ? 'from-transparent via-neon-cyan/50 to-transparent'
            : 'from-transparent via-blue-500/50 to-transparent'
        }`} />

        <button
          onClick={toggleTheme}
          onMouseEnter={() => setHoveredItem('theme')}
          className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
            hoveredItem === 'theme'
              ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/20 text-blue-600'
              : theme === 'dark' ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
          } ${hoveredItem !== 'theme' && 'w-10 justify-center'}`}
          title="Toggle Theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
          </motion.div>
          <motion.span
            initial={{ width: 0, opacity: 0, x: -10 }}
            animate={{
              width: hoveredItem === 'theme' ? 'auto' : 0,
              opacity: hoveredItem === 'theme' ? 1 : 0,
              x: hoveredItem === 'theme' ? 0 : -10,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap text-sm font-medium"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </motion.span>
        </button>

        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = portfolioData.resume.url;
            link.download = 'Arnav_Gupta_Resume.pdf';
            link.click();
          }}
          onMouseEnter={() => setHoveredItem('resume')}
          className={`flex items-center gap-2 p-2 rounded-full transition-all duration-300 ${
            hoveredItem === 'resume'
              ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/20 text-blue-600'
              : theme === 'dark' ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
          } ${hoveredItem !== 'resume' && 'w-10 justify-center'}`}
          title="Download Resume"
        >
          <FileText className="w-5 h-5 shrink-0" />
          <motion.span
            initial={{ width: 0, opacity: 0, x: -10 }}
            animate={{
              width: hoveredItem === 'resume' ? 'auto' : 0,
              opacity: hoveredItem === 'resume' ? 1 : 0,
              x: hoveredItem === 'resume' ? 0 : -10,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.2 }}
            className="overflow-hidden whitespace-nowrap text-sm font-medium"
          >
            Resume
          </motion.span>
        </button>
      </motion.div>
    </header>
  );
};

export default NavigationDock;
