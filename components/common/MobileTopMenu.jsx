'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Clock, Code2, Award, Mail, FileText, Sun, Moon, Github, Linkedin } from 'lucide-react';
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

export default function MobileTopMenu() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
  const activeSectionId = useActiveSection(sectionIds) || 'home';

  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`fixed top-4 left-4 z-50 w-11 h-11 grid place-items-center rounded-full border backdrop-blur-xl transition-colors duration-300 ${
          theme === 'dark' ? 'bg-black/40 border-white/10 text-gray-200' : 'bg-white/70 border-gray-200/70 text-gray-800'
        }`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.button
            key="overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`fixed top-16 left-4 z-50 w-[min(88vw,22rem)] rounded-2xl border p-3 shadow-2xl backdrop-blur-2xl transition-colors duration-300 ${
              theme === 'dark' ? 'bg-black/50 border-white/10' : 'bg-white/80 border-gray-200/70'
            }`}
          >
            <div className="flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeSectionId === link.href.replace('#', '');
                return (
                  <button
                    key={link.name}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors duration-200 ${
                      isActive
                        ? theme === 'dark' ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-blue-500/15 text-blue-700'
                        : theme === 'dark' ? 'text-gray-200 hover:text-neon-cyan hover:bg-white/5' : 'text-gray-800 hover:text-blue-700 hover:bg-gray-100'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="my-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  s.url ? (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 grid place-items-center rounded-xl border transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-200 border-white/10 hover:text-neon-cyan' : 'text-gray-800 border-gray-200/70 hover:text-blue-700'
                      }`}
                      aria-label={s.name}
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ) : null
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = portfolioData.resume.url;
                    link.download = 'Arnav_Gupta_Resume.pdf';
                    link.click();
                  }}
                  className={`w-10 h-10 grid place-items-center rounded-xl border transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-200 border-white/10 hover:text-neon-cyan' : 'text-gray-800 border-gray-200/70 hover:text-blue-700'
                  }`}
                  aria-label="Download Resume"
                  title="Download Resume"
                >
                  <FileText className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleTheme}
                  className={`w-10 h-10 grid place-items-center rounded-xl border transition-colors duration-200 ${
                    theme === 'dark' ? 'text-gray-200 border-white/10 hover:text-neon-cyan' : 'text-gray-800 border-gray-200/70 hover:text-blue-700'
                  }`}
                  aria-label="Toggle Theme"
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
