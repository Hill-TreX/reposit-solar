import { useEffect, useRef } from 'react';

/**
 * Reveals elements with .scroll-reveal class when they enter the viewport.
 * Add class="scroll-reveal" to any element you want to animate in on scroll.
 * Elements start invisible and slide up with a fade when they scroll into view.
 * Use data-delay="1|2|3|4" for staggered animations on children.
 */
export function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.scroll-reveal');
    const revealed = new Set<Element>();

    const reveal = (el: HTMLElement) => {
      if (revealed.has(el)) return;
      revealed.add(el);
      const delay = el.dataset.delay;
      el.classList.add('animate-reveal');
      if (delay) el.classList.add(`animate-reveal-delay-${delay}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      observer.observe(el);
    });

    // Safety fallback: reveal all elements after 3s in case observer doesn't fire
    const fallbackTimer = setTimeout(() => {
      elements.forEach((el) => reveal(el as HTMLElement));
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return containerRef;
}