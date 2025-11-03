'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to detect if an element is in viewport
 */
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

/**
 * Hook for counting animation
 */
export const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(start + (end - start) * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, end, duration, start]);

  return [count, setIsActive];
};

/**
 * Hook to detect scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to determine the currently active section using IntersectionObserver.
 * It favors the element with the highest intersection ratio within a centered viewport band.
 */
export const useActiveSection = (sectionIds = [], options = {}) => {
  const [active, setActive] = useState(sectionIds[0] || '');
  const stateRef = useRef({}); // id -> { ratio, top }
  const observedRef = useRef(new Set());

  useEffect(() => {
    if (!sectionIds?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Update latest state for changed entries
        entries.forEach((e) => {
          stateRef.current[e.target.id] = {
            ratio: e.intersectionRatio,
            top: e.boundingClientRect.top,
          };
        });

        // Build candidate list from all observed ids
        const candidates = sectionIds
          .map((id) => ({ id, ...(stateRef.current[id] || { ratio: 0, top: Number.POSITIVE_INFINITY }) }));

        // Prefer highest ratio; if all 0, pick closest to viewport top
        const byRatio = [...candidates].sort((a, b) => b.ratio - a.ratio);
        let next = byRatio[0];
        if (!next || next.ratio <= 0) {
          next = [...candidates].sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0];
        }

        // Stronger home guard: if very close to top (scrollY < 100), always select home
        if (typeof window !== 'undefined' && window.scrollY < 100) {
          const homeId = sectionIds[0];
          next = { id: homeId, ratio: 1, top: 0 };
        }

        // Favor the first section (home) when near the top of the page or when its top is close to the viewport top
        if (typeof window !== 'undefined') {
          const homeId = sectionIds[0];
          const homeEl = document.getElementById(homeId);
          if (homeEl) {
            const top = homeEl.getBoundingClientRect().top;
            // If the home section's top is within 200px above the viewport top, treat it as active
            if (top > -200) {
              next = { id: homeId, ratio: 1, top };
            }
          } else if (window.scrollY < 200) {
            // Fallback: if scrollY is small, force home active
            next = { id: homeId, ratio: 1, top: 0 };
          }
        }

        // Absolute top guard: if at the very top, always select home
        if (typeof window !== 'undefined' && window.scrollY === 0) {
          const homeId = sectionIds[0];
          next = { id: homeId, ratio: 1, top: 0 };
        }

        if (next && next.id && next.id !== active) {
          setActive(next.id);
        }
      },
      {
        root: null,
        // Central viewport band for natural switching, compensates sticky headers
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options,
      }
    );

    const tryAttach = () => {
      sectionIds.forEach((id) => {
        if (observedRef.current.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedRef.current.add(id);
        }
      });
    };

    // Initial attempt
    tryAttach();

    // Observe DOM changes to attach later-mounted sections
    const mo = new MutationObserver(() => {
      tryAttach();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      observer.disconnect();
      stateRef.current = {};
      observedRef.current.clear();
    };
  }, [sectionIds.join('|')]);

  return active;
};
