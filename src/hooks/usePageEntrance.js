import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const usePageEntrance = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    
    const tag = container.querySelector('span.font-accent');
    const title = container.querySelector('h1');
    const desc = container.querySelector('p');
    const cta = container.querySelector('form, .cta-wrapper');

    const animatedElements = [tag, title, desc, cta].filter(Boolean);
    gsap.set(animatedElements, { willChange: "transform, opacity", opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(animatedElements, { clearProps: "willChange" });
      }
    });

    if (tag) {
      tl.fromTo(tag, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.1);
    }
    
    if (title) {
      tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.25);
    }
    
    if (desc) {
      tl.fromTo(desc, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.45);
    }
    
    if (cta) {
      tl.fromTo(cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.6);
    }

  }, []);

  return containerRef;
};
