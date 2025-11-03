'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Clock, Code2, Award, Mail, FileText, Sun, Moon, Github, Linkedin } from 'lucide-react';
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

export default function MobileMenu() {
  const { theme, toggleTheme } = useTheme();
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

  const effectiveActiveId = forcedId || activeSectionId || 'home';

  return (
    <nav className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(100%-1rem,680px)]`}>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14 }}
        className={`flex items-center justify-between gap-1 px-2 py-2 rounded-full backdrop-blur-xl shadow-2xl border transition-colors duration-300 ${
          theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white/70 border-gray-200/70'
        }`}
        role="navigation"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = effectiveActiveId === link.href.replace('#', '');
            return (
              <motion.button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.href)}
                whileTap={{ scale: 0.94 }}
                className={`relative w-10 h-10 grid place-items-center rounded-full transition-all duration-300 ${
                  isActive
                    ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/20 text-blue-600'
                    : theme === 'dark' ? 'text-gray-300 hover:text-neon-cyan' : 'text-gray-700 hover:text-blue-600'
                }`}
                aria-label={link.name}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-glow"
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: theme === 'dark' ? '0 0 24px rgba(34,211,238,0.35)' : '0 0 24px rgba(59,130,246,0.35)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon className="w-5 h-5 relative z-10" />
              </motion.button>
            );
          })}
        </div>

        <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent dark:via-white/10" />

        <div className="flex items-center gap-1">
          {socialLinks.map((s) => (
            s.url ? (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.94 }}
                className={`w-10 h-10 grid place-items-center rounded-full transition-all duration-300 ${
                  theme === 'dark' ? 'text-gray-300 hover:text-neon-cyan' : 'text-gray-700 hover:text-blue-600'
                }`}
                aria-label={s.name}
              >
                <s.icon className="w-5 h-5" />
              </motion.a>
            ) : null
          ))}

          <motion.button
            onClick={() => {
              const link = document.createElement('a');
              link.href = portfolioData.resume.url;
              link.download = 'Arnav_Gupta_Resume.pdf';
              link.click();
            }}
            whileTap={{ scale: 0.94 }}
            className={`w-10 h-10 grid place-items-center rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-300 hover:text-neon-cyan' : 'text-gray-700 hover:text-blue-600'
            }`}
            aria-label="Download Resume"
            title="Download Resume"
          >
            <FileText className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.94, rotate: theme === 'dark' ? 0 : 180 }}
            className={`w-10 h-10 grid place-items-center rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'text-gray-300 hover:text-neon-cyan' : 'text-gray-700 hover:text-blue-600'
            }`}
            aria-label="Toggle Theme"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.div>
    </nav>
  );
}
